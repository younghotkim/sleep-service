/**
 * SleepTune Sensor Integration Library
 * - Accelerometer: Detects micro-movements during sleep
 * - Microphone: Detects noise levels and snoring patterns
 */

export interface SensorData {
  timestamp: number;
  motionIntensity: number; // 0 to 1 scale
  noiseLevel: number; // 0 to 1 scale (normalized dB)
}

export class SleepSensorManager {
  private motionCallback: ((data: number) => void) | null = null;
  private noiseCallback: ((data: number) => void) | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private isProcessing = false;

  constructor() {}

  /**
   * Request permissions and initialize sensors
   */
  async requestPermissions(): Promise<boolean> {
    try {
      // 1. Microphone permission
      this.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. Motion permission (iOS requires explicit button click, but we check here)
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        const response = await (DeviceMotionEvent as any).requestPermission();
        if (response !== 'granted') return false;
      }
      
      return true;
    } catch (err) {
      console.error('Sensor permission denied:', err);
      return false;
    }
  }

  /**
   * Start motion tracking
   */
  startMotionTracking(callback: (intensity: number) => void) {
    this.motionCallback = callback;
    window.addEventListener('devicemotion', this.handleMotion);
  }

  /**
   * Start noise tracking (Microphone)
   */
  async startNoiseTracking(callback: (noise: number) => void) {
    this.noiseCallback = callback;
    
    if (!this.microphoneStream) return;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    
    const source = this.audioContext.createMediaStreamSource(this.microphoneStream);
    source.connect(this.analyser);
    
    this.isProcessing = true;
    this.processNoise();
  }

  private handleMotion = (event: DeviceMotionEvent) => {
    if (!this.motionCallback || !event.accelerationIncludingGravity) return;
    
    const { x, y, z } = event.accelerationIncludingGravity;
    // Simple motion intensity calculation: magnitude of change
    const intensity = Math.sqrt((x || 0)**2 + (y || 0)**2 + (z || 0)**2);
    // Normalize slightly (experimental: subtract gravity, clamp to 0-1)
    const normalized = Math.min(Math.max((intensity - 9.8) / 5, 0), 1);
    this.motionCallback(normalized);
  };

  private processNoise = () => {
    if (!this.analyser || !this.noiseCallback || !this.isProcessing) return;
    
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    
    // Average volume across frequencies
    const average = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
    const normalized = Math.min(average / 128, 1); // 0-1 scale
    
    this.noiseCallback(normalized);
    requestAnimationFrame(this.processNoise);
  };

  stopAll() {
    this.isProcessing = false;
    window.removeEventListener('devicemotion', this.handleMotion);
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
    }
  }
}

# 🛌 SleepTune 프로젝트 Git 협업 전략 및 브랜치 전략

5인 팀의 효율적인 협업을 위해 **Git Flow** 방식에 기반한 브랜치 전략과 약속을 제안합니다. 이 문서는 팀원 모두가 동일한 흐름으로 코드를 관리하기 위해 참조합니다.

---

## 🧭 1. 브랜치 구조 (Branch Structure)

본 프로젝트는 아래 5가지 성격의 브랜치를 운영합니다.

### 🏁 `main` (Production)
- 항상 **출시 가능한 버전**의 코드만 관리합니다.
- 직접적으로 커밋을 하지 않으며, `release` 브랜치나 `hotfix` 브랜치에서만 병합됩니다.

### 🏗️ `develop` (Integration)
- **개발의 메인 브랜치**입니다.
- 모든 `feature` 브랜치의 개발이 완료되면 이곳으로 모입니다.
- 다음 배포를 위한 최신 상태의 코드가 유지되어야 합니다.

### 🚀 `feature/*` (Feature Development)
- 새로운 **기능 개발**을 위한 브랜치입니다.
- 소문자 브랜치명을 사용하며, 역할에 따라 구분합니다. (예: `feature/sidebar`, `feature/pet-animation`)
- `develop` 브랜치에서 분기하며, 개발 완료 후 `develop`으로 Pull Request(PR)를 보냅니다.

### 📦 `release/*` (Release Prep)
- 배포 준비를 위한 브랜치입니다. (`develop` → `main` 전 단계)
- 버그 수정(Bug fix) 및 버전업 작업만 수행합니다.

### 🚑 `hotfix/*` (Emergency Fixes)
- `main`에 배포된 운영 환경에서 심각한 오류가 발생했을 때 즉시 수정하기 위한 브랜치입니다.
- `main`에서 직접 분기하며 수정 후 `main`과 `develop` 모두에 병합합니다.

---

## 🛠️ 2. 워크플로우 (Collaboration Workflow)

1.  **Ticket/Issue 확인**: 작업할 기능이나 버그를 정의합니다.
2.  **브랜치 생성**: `git checkout -b feature/기능명 develop`
3.  **작업 및 커밋**: 작은 단위로 나누어 자주 커밋합니다. (커밋 메시지 규정 준수)
4.  **최신화 및 충돌 방지**: 작업을 마칠 때쯤 `develop` 브랜치의 최신 변경 사항을 자신의 브랜치에 미리 가져와서 충돌을 해결합니다. (`git merge develop`)
5.  **Push 및 PR 생성**: `origin` 저장소로 push 후 GitHub에서 `develop` 브랜치로 **Pull Request**를 생성합니다.
6.  **Code Review**: 최소 **1명 이상의 동료**가 승인(Approve)해야 병합할 수 있습니다.
7.  **Merge**: 승인 완료 후 `Squash and Merge` 혹은 `Merge Commit` 방식으로 개발 브랜치에 병합합니다.

---

## 📝 3. 커밋 메시지 컨벤션 (Commit Convention)

일관된 히스토리 관리를 위해 **Angular Commit Message Guide**를 기반으로 작성합니다.

- **형식**: `type: description` (예: `feat: 사이드바 수면 포인트 UI 추가`)
- **주요 타입**:
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정 (README, PRD 등)
  - `style`: 코드 스타일 변경 (포맷팅, 세미콜론 등, 기능상 변경 없음)
  - `refactor`: 코드 리팩토링
  - `test`: 테스트 코드 추가
  - `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

---

## 🛡️ 4. 협업을 위한 Golden Rules

- **Force Push 엄금**: 공유 브랜치(`main`, `develop`)에 `-f` 옵션으로 강제 push 하지 않습니다.
- **작업 전 Pull 필수**: 새로운 작업을 시작하기 전에는 반드시 `git pull origin develop`으로 최신 상태를 유지하시기 바랍니다.
- **의미 있는 PR 제목**: 제목만 봐도 어떤 변경 사항인지 알 수 있게 작성해주세요. (예: `[Feat] 명상 플레이어 UI 및 오디오 연동`)

---

우리 모두의 `Good Night, High Code`를 위해 이 전략을 존중하며 즐겁게 개발합시다! 🚀

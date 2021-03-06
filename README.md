# :office: 기업형 포트폴리오 사이트

**사이트 주소** : https://danbi-lee.github.io/portfolio_Corporate/

## :pencil: UI
- 시안 제작 : Affinity Photo 사용

- 그리드
	- 컨테이너 1200px, 12컬럼
	- 컬럼 : 80px
	- 거터 : 20px

- 타블렛, 모바일 버전 반응형으로 구현

## :pencil: 기술 사항

> ※ [[부스트코스]웹 UI개발](https://www.edwith.org/boostcourse-ui/joinLectures/20901) 프로젝트 기술 요구 사항 참고

### HTML
- 의미에 맞는 태그를 최대한 사용 (시맨틱 마크업)
- 문서의 내용은 논리적인 흐름에 맞게 작성
- 코드 유효성 검사 통과 (https://validator.w3.org/)
- 컨텐츠가 영문이므로 언어 속성을 영어로 함

### CSS
- 외부 스타일 시트로 작업
- 네이밍은 규칙성 있게 작성
- 코드 유효성 검사 통과 (https://jigsaw.w3.org/css-validator/)

## :pushpin: 워크 플로우
- [이슈 기반 버전 관리 워크플로우](https://danbi-s-rain.gitbook.io/blog/coding/git/project-git-workflow)에 따라 작업
- 브랜치 구분 (작은 프로젝트와 맞게 git-flow 수정, ※[참고블로그](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html))
	- 호스팅 : gh-pages

	- 메인 브랜치
		- develop : 개발 브랜치
		- master : 개발 한 단위가 끝날 때 사용 (gh-pages 브랜치에 올리기 전단계)

	- 보조 브랜치
		> - 그때그때 브랜를 만들어 작업하고 메인 브랜치에 병합
		> - 사용이 끝난 브랜치는 삭제
		> - 이슈 기반 작업을 할 것이므로 주로 이슈 브랜치를 사용할 것 같음

		- `이슈 번호-설명` : 이슈 사항에 따른 브랜치
		- fix : 버그수정 브랜치
		- feature : 기능 개발 브랜치

참고자료 : https://www.youtube.com/watch?v=UPv-3SYRdZk&t=1951s&ab_channel=edutechional

# Lifecycle

![](https://images.velog.io/images/seonja/post/747a57f9-3d5f-4867-8917-47caf479d16d/Screen%20Shot%202021-09-08%20at%2016.04.27.png)

모든 라이프 사이클을 살펴볼 수 있는 간단한 컴포넌트를 만들었습니다.
전체적으로는 Discussion, Rules, Workflow 컴포넌트를 구성하여 Router를 이용해서 각 컴포넌트를 mount와 unmount할 수 있도록 구성하였습니다.

<br>

## Mount와 Unmount

![](https://images.velog.io/images/seonja/post/194fdea3-84db-4b39-9cc5-336bbf1061b2/mountUnmount.gif)

<br>

### Mount와 Render

그럼 먼저 Mount와 Render가 무엇인지 간단하게 정의를 하자면

- Mount : 컴포넌트가 생성되고 DOM에 주입되는 것을 의미하며 최초 한번만 실행됨
- Render : DOM에 그려주는 작업으로 props나 state값이 변할 때마다 해당 작업을 수행

<br>

위의 gif파일을 보시면 Mount시 constructor, (props가 있을 경우) getDerivedStateFromProps, render, componentDidMount 순서로 진행이 되며 다른 컴포넌트로 이동할 경우 componentWillUnmount가 실행되게 됩니다.

<br>

### Update와 Re-render

![](https://images.velog.io/images/seonja/post/3e5414b9-0afb-4333-9f6d-91e59d691767/updateRerender.gif)

update시 (props가 있을 경우) getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, ComponentDidUpdate가 순서로 진행됩니다.

<br>

## 잘못 이해하고 있었던 부분

저는 하나의 사이트는 단 하나의 lifecycle을 가지고 있다고 착각하고 있었습니다. 이 생각이 이전에 useLongPress함수 구현 후 테스트시 단순히 console.log에 찍힌 사항들로 render의
빈도를 판단하게 했었고, 그 부분에서 lifecycle을 이해하지 못하고 있다는 피드백을 받았었던 것 같습니다.

<br>

> 각 컴포넌트는 모두 각각의 lifecycle을 가지고 있고 저 method들은 mount, update, unmount시 처리해줘야 하는 로직들을 처리할 수 있도록 도와주는 역할이라는 것을 인지하게 되었습니다.

<br>

## lifecyle을 모르면 발생할 수 있는 문제점

![](https://images.velog.io/images/seonja/post/dd68b628-2145-4499-b4da-d661fddb6777/Screen%20Shot%202021-09-08%20at%2016.40.25.png)

Discussion 컴포넌트에 setInterval을 이용해서 시간을 update하도록 구성하였습니다.

![](https://images.velog.io/images/seonja/post/8793fdde-35e0-408c-b496-01567a336725/memleak.gif)

위의 gif와 같이 컴포넌트가 unmount되었음에도 Discussion 컴포넌트에서 setInterval이 발생하고 있어 메모리 누수가 생기게 됩니다.

<br>

이를 방지하기 위해서 clearInterval을 해줘야 하고 이 함수는 컴포넌트가 unmount될 때
사용하는 method인 componentWillUnmount에서 처리할 수 있습니다.

![](https://images.velog.io/images/seonja/post/d1f34d1a-bcaf-45cb-927e-d1deda19e215/Screen%20Shot%202021-09-08%20at%2016.48.13.png)

![](https://images.velog.io/images/seonja/post/1d5a00e3-cfec-4185-bac4-3aa53bb570bc/memleakUnmount.gif)

<br>

이와 같이 하나의 컴포넌트가 unmount되는 상황에서 해당 컴포넌트가 불필요한 연산이나 memory leak 발생을 방지하기 위해 처리해야하는 로직은 componentWillUnmount 메소드에서 처리하게 됩니다.

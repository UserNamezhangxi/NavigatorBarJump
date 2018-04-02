## React Native --- Navigator 添加导航栏##

### 首先这里介绍的通用的Navigator，并非是NavigatorIOS ###

----------

> 注意：从0.44版本开始，Navigator被从react native的核心组件库中剥离到了一个名为react-native-deprecated-custom-components的单独模块中。如果你需要继续使用Navigator，则需要先安装`npm i facebookarchive/react-native-custom-components`，然后从这个模块中import，即`import { Navigator } from 'react-native-deprecated-custom-components'`


### 1、导入 ###
	npm i facebookarchive/react-native-custom-components

	import { Navigator } from 'react-native-deprecated-custom-components'
### 2、使用 ###
	
> 创建好基本工程之后，需要在初始页面准备一个 `Navigator`，相当于一个节目需要有个主持人，才能进行界面的正常演出。

1. 创建两个用来跳转的页面。

		FirstPage.js

		SecondPage.js

2. 我的做法是在App.js 里进行。	

		render() {
	        return (
	            <Navigator
	                initialRoute={{
	                    title: '第一页',
	                    name: 'FirstPage',    // 名称
	                    component: FirstPage,  // 要跳转的板块
	                    passProps: {
	                        name: '参数1'
	                    }
	                }}
					configureScene={() => Navigator.SceneConfigs.FloatFromRight} //配置页面的出现方式，默认是FloatFromRight，从右侧出现
	                renderScene={(route, navigator) => {    // 将板块生成具体的组件
	                    let Component = route.component;    // 获取路由内的板块
	                    return <Component {...route.passProps} navigator={navigator}
	                    />
	                }}
	                {/*如果需要顶端的样式，navigationBar 样式需要重写*/}
	                navigationBar={
	                    <Navigator.NavigationBar
	                        style={styles.navBar}
	                        routeMapper={this.NavigationBarRouteMapper}
	                    />
	                }
	            />
	        );
		}
	注意:configureScene设置切换动画，可取值
	<ol>
	<li>Navigator.SceneConfigs.PushFromRight (default)</li>
	<li>Navigator.SceneConfigs.FloatFromRight</li>
	<li>Navigator.SceneConfigs.FloatFromLeft</li>
	<li>Navigator.SceneConfigs.FloatFromBottom</li>
	<li>Navigator.SceneConfigs.FloatFromBottomAndroid</li>
	<li>Navigator.SceneConfigs.FadeAndroid</li>
	<li>Navigator.SceneConfigs.HorizontalSwipeJump</li>
	<li>Navigator.SceneConfigs.HorizontalSwipeJumpFromRight</li>	
	<li>Navigator.SceneConfigs.VerticalUpSwipeJump</li>
	<li>Navigator.SceneConfigs.VerticalDownSwipeJump</li>
	</ol>

	> 当然在这里顶部的导航栏是我们的重点，navigationBar 头部固定导航栏，然后具体看看参数`NavigationBarRouteMapper`的实现。
	
		NavigationBarRouteMapper = {
	        //左边Button
	        LeftButton: (route, navigator, index, navState)=> {
	            if (route.title  === '第一页') {
	                return null;
	            }
	            return (
	                <TouchableOpacity
	                    onPress={() => navigator.pop()}
	                    style={styles.navBarLeftButton}>
	                    {/*这里可以用图标代替*/}
	                    <Text style={styles.navBarButtonText}>
	                       back
	                    </Text>
	                </TouchableOpacity>
	            );
	        },
	        //右边Button
	        RightButton: (route, navigator, index, navState)=> {
	            if (route.title === '第二页') {
	                return null;
	            }
	            return (
	                <TouchableOpacity
	                    onPress={() => navigator.push({
	                        component: SecondPage,//跳转页面
	                        title: '第二页',
	                        passProps:{
	                            name:'zx'
	                        }
	                    })}
	                    style={styles.navBarRightButton}>
	                    {/*这里可以用图标代替*/}
	                    <Text style={styles.navBarButtonText}>
	                        Next
	                    </Text>
	                </TouchableOpacity>
	            );
	        },
	        //标题 如果要有点击事件可以自行定义
	        Title: (route, navigator, index, navState)=> {
	            return (
	                <Text style={styles.navBarTitleText}>
	                    {route.title}
	                </Text>
	            );
	        },
	    };

	> 这样项目就有一个主持人了，主持人让哪个项目表演，哪个就表演。接下来，我要让FirstPage进行表演。
那么在<Navigator 中就需要配置 登场人物 (格式固定)：
	
		initialRoute={{
	        title: '第一页',
	        name: 'FirstPage',     // 名称
	        component: FirstPage,  // 要跳转的板块
	        passProps: {
	            name: '参数1'
	        }
	    }}
		renderScene={(route, navigator) => {    // 将板块生成具体的组件
	        let Component = route.component;    // 获取路由内的板块
	        return <Component {...route.passProps} navigator={navigator}
	        />
	    }}

3.	这样启动app 之后，就会让第一个界面 进入演出。

		render() {
	        return (
	            <View style={styles.container}>
	                <TouchableOpacity
	                    onPress={()=>{
	                        this._goSecondPage();//第一页的节目演出完成，调用第二个节目演出。
	                    }}
	                >
	                    <Text style={styles.testStyle}>
	                        click to second Page:{this.props.name}
	                    </Text>
	                </TouchableOpacity>
	            </View>
	        );
	    }

	------
		/*页面内跳转*/
	    _goSecondPage(){
	        this.props.navigator.push({
	            component: SecondPage,//跳转页面
	            title: '第二页',
	            passProps:{
	                name:'参数'//传递参数[key,value]
	            }
	        })
	    }
	>注意：这里进行的push 操作，进栈操作。 类似进入anroid 的 Activity管理栈的栈顶。
4.	第一个界面展示完成需要启动第二个界面。就执行如上操作。配置要跳转进入的界面。
	
		进入第二个页面:
		 render() {
	        return (
	            <View style={styles.container}>
	                <TouchableOpacity onPress={()=>{
	                    this._goFirstPage()
	                }}>
	                    <Text style={styles.testStyle}>
	                        点我返回第一页:{this.props.name} // 第一页传递过来的参数。
	                    </Text>
	                </TouchableOpacity>
	            </View>
	        );
	    }
		// 这里进行pop(),类似android里面activity 的 finish(),这样就从栈中移除了此界面。
	    _goFirstPage(){
	        this.props.navigator.pop();
	    }
	
------------------------------------------
###  3. navigator 常用方法###

*	push(route) ，跳转到某一个Route（界面）

*	pop()，退出当前状态

*	popToTop()，退出到第一个界面

*	popToRoute(route)，退出到某一个界面	

---
title: Using dagger-hilt in Android Example
category: android-kotlin
tags:
- AndroidUI
- MVVM
---

<p float="center">
  <img src="/assets/images/gif/2020-10-2516-05.gif" width="300" />
</p>

의존성 주입(Dependency Injection)을 구현하는 dagger-hilt eample을 공부하고 정리한 글   

참고자료   
[Hilt - 공식문서](https://developer.android.com/training/dependency-injection/hilt-android?hl=ko)   
[Hilt - Example](https://codelabs.developers.google.com/codelabs/android-hilt/?hl=ko#0)   
## `Dependency Injection`과 `Hilt`
`Dependency Injection` 줄여서 `DI`는 프로그래밍에 널리 사용되며 안드로이드 개발에 잘 맞는 기술이다. `DI`의 원칙을 따르면 좋은 앱 아키텍처의 기초를 갖출 수 있다.   
- `DI`의 장점   
 - 코드의 재사용성   
 - 리팩토링 용이성      
 - 테스트 용이성   

`Hilt`는 Android를 위한 `DI` 라이브러리이다. `DI`를 구현하려면 모든 클래스와 그 종속성을 수동으로 구성하고 컨테이너를 사용하여 재사용할 수 있도록 관리해야한다.    
`Hilt`는 프로젝트의 모든 Android 구성요소에 컨테이너를 제공하고 컨테이너의 수명주기를 자동으로 관리함으로써 `DI`를 수행하는 표준을 제공한다.   
Android의 인기있는 라이브러리인 `Dagger`를 활용함으로써 완성된다.   

결국 해당 예제는 `DI`를 이해하는 것을 중점으로 두고 `Hilt`가 어떠한 편리함을 가져다 주는지 그리고 그안에서 `Dagger`가 어떻게 활용되는지를 알아가는것이 목표이다.

참고자료   
[DI - 공식문서](https://developer.android.com/training/dependency-injection/manual?hl=ko)   
[수동 DI - 공식문서](https://developer.android.com/training/dependency-injection/manual?hl=ko)   
[Dagger - 공식문서](https://developer.android.com/training/dependency-injection/dagger-basics?hl=ko)   

## `DI`의 기본사항   
[공식문서](https://developer.android.com/training/dependency-injection?hl=ko)   
클래스에는 흔히 다른 클래스의 참조가 필요하다. 예를들면 `Car` 클래스는 `Engine`클래스 참조가 필요할 수 있다. 여기서 `Engine`클래스를 종속 항목이라한다.   
   

- 클래스가 필요한 종속 항목을 구성 
- `Car`클래스가 자체적으로 `Engine` 인스턴스를 생성하여 초기화한다.   

```
class Car {

    private val engine = Engine()

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.start()
}
```
문제점
- `Car`와 `Engine`은 밀접하게 연관되어 있다. `Car`인스턴스는 한가지 유형의 `Engine`을 사용하므로 서브클래스 또는 대체구현을 쉽게 사용할 수 없다.  
- `Engine`이라는 강력한 종속항목은 테스트를 어렵게 만든다.    
	- 실제 `Engine` 인스턴스를 사용하므로 테스트더블을 적용할 수 없다.   

!! 종송항목의 활용
- 객체를 매개변수로 제공받는다.   
- `Car`생성자는 `Engine`을 매개변수로 받는다.   

```
class Car(private val engine: Engine) {
    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val engine = Engine()
    val car = Car(engine)
    car.start()
}
```
장점
- `Car` 재사용성 증가   
	- 다양한 `Engine`의 인스턴스를 `Car`에 전달할 수 있다. 
		- `ElectricEngine`이라는 `Engine`의 서브클래스를 정의하고 `Car`에 전달하면 추가 변경없이 계속 동작한다.   
- `Car`테스트 편리함 증가   
	- 다양한 시나리오를 테스트할 수 있다.   
		- `FakeEngine`이라는 테스트 더블을 생성하여 다양한 테스트를 구성할 수 있다.   
   

위 방법과 더불어 필드 또는 setter를 삽입하는 다음의 방법이 있다.   
```
class Car {
    lateinit var engine: Engine

    fun start() {
        engine.start()
    }
}
```

위 예제는 라이브러리를 사용하지 않고 종속 항목을 직접 생성, 제공 및 관리하였다. 이를 `수동 종속항목 삽입`이라한다.  종속항목과 클래스가 많아지면 이러한 수동작업이 불필요한 반복작업이 될 수 있으며 다음과 같은 문제점을 발생시킨다.   
- 대규모 앱에서 종속항목을 가져와 연결하려면 대량의 상용구 코드가 필요할 수 있다.   
	- 다중 레이어 아키텍쳐에서 최상위 레이어의 객체를 생성하려면 아래에있는 레이어의 모든 종속항목을 제공해야 한다.   
		- 실제 자동차를 생각해보면 엔진, 변속기, 섀시 등 기타 수많은 부품이 필요하다.    

종속항목을 생성하고 제공하는 프로세스를 자동화하여 위 문제를 해결하는것이 `Dagger`라이브러리이다.   
	- 런타임 시 종속 항목을 연결하는 리플렉션기반 솔루션   
	- 컴파일 타임에 종속 항목을 연결하는 코드를 생성하는 정적 솔루션   
`Dagger`는 Kotlin 및 Android용으로 널리 사용되는 종속 항목 라이브러리이다. 종속항목 그래프를 자동으로 생성하고 관리하여 앱에서의 `DI` 사용도를 높인다.    
   
`DI` 의 2가지 대안   
1.`ServiceLocator`를 사용하는 방법   
```
object ServiceLocator {
    fun getEngine(): Engine = Engine()
}

class Car {
    private val engine = ServiceLocator.getEngine()

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.start()
}
```
2.`Hilt`를 사용하는 방법   

해당 예제를 통해 구현하는 방법은 2번에 해당하며 `Hilt`는 Android에서 `DI`사용을 위한 `Jetapck` 권장 라이브러리이다.  프로젝트의 모든 Android 클래스에 컨테이너를 제공하고 수명 주기를 자동으로 관리함으로써 `DI`를 실행하는 표준을 정의한다. `Hilt`는 `Dagger`가 제공하는 컴파일 타임 정확성, 런타임 성능, 확장성 및 Android 스튜디오 지원의 이점의 이유로 `Dagger`를 기반으로 빌드되었다.

## set up `Hilt`
```
// build.gradle (Project)

buildscript {
    ...
    ext.hilt_version = '2.28-alpha'
    dependencies {
        ...
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
```
```
// build.gradle(app)

apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'

android {
    ...
}

...
dependencies {
    ...
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-android-compiler:$hilt_version"
}
```
```
//LogApplication.kt

@HiltAndroidApp
class LogApplication : Application() {
  ...
}
```
- `ServiceLocator` 인스턴스가 사용되고 초기화되는 방식과 유사하게 앱의 수명주기에 부착된 컨테이너를 추가하기 위해 `Application()` 클래스에 @HiltAndroidApp 어노테이션을 추가해야한다.   
	- @HiltAndroidApp은 종속성 주입을 사용할 수 있는 응용프로그램의 기본클래스를 포함하여 Hilt의 코드 생성을 트리거한다.   
	- 애플리케이션 컨테이너는 앱의 상위 컨테이너로서 다른 컨테이너가 제공하는 종속성에 액세스할 수 있다든것을 의미한다.


## Field injection with `Hilt`
```
@AndroidEntryPoint
class LogsFragment : Fragment() {
    ...
}
```
- 클래스에서 `Hilt` 를 사용하여 의존성을 제공할 수 있다. 
	-  LogsFragment `UI controller`가 Hilt를 사용하기 위해선 @AndroidEntryPoint 어노테이션을 추가해야한다.   
	-  Android 클래스 라이프사이클을 따르는 종속 컨테이너가 생성된다.   
	-  다음과 같은 Android 유형을 지원한다.   
		-  application(@HiltAndroidApp), activity, fragment, view, service, broadcast receiver
			- fragment는 AppcompletionActivity와 Jetpack 라이브러리 fragment를 확장하는 것만 지원한다.   
   
```
@AndroidEntryPoint
class LogsFragment : Fragment() {

    @Inject lateinit var logger: LoggerLocalDataSource
    @Inject lateinit var dateFormatter: DateFormatter

    ...
}
```
- `Hilt`는 @AndroidEntryPoint를 사용하여 LogsFragment의 수명주기에 연결된 종속 컨테이너를 생성하고 LogsFragment에 인스턴스를 주입할 수 있게 해준다.    
	- 주입할 필드에 @Inject 어노테이션을 사용하여 `Hilt` 주입 인스턴스를 만들 수 있다.   
		- 이것을 Field injection 이라한다.   
			- @injection field는 private이면 안된다.   
	- Field injection을 수행하려면 `Hilt`는 종속석 인스턴스 제공 방법을 알아야한다.   
		- 아직 `Hilt`는`LoggerLocalDataSource`, `DataFormatter`인스턴스를 어떻게 제공해야 하는지 모른다.

## `Hilt`에 @Inject 종속성 제공
```
// util/DateFormmater.kt
class DateFormatter @Inject constructor() { ... }
...

// data/LoggerLocalDatabase.kt
class LoggerLocalDataSource @Inject constructor(private val logDao: LogDao) {
    ...
}
```
- `DateFormatter`는 다른 클래스에 의존하지 않기 때문에 transitive dependencies를 걱정할 필요가 없다.   
	-  주입할 클래스의 생성자에 constructor와 함께 @Inject annotation을 추가하면 `Hilt`에 인스턴스 제공 방법을 알려주게 된다.
- `LoggerLocalDataSource`도 마찬가지로 동일하게 추가해준다.   

!!힐트가 가지고 있는 다른 유형의 인스턴스 제공 방법에 관한 정보를 바인딩이라고도 한다.   
현재 힐트에는 `DateFormatter`,`LoggerLocalDataSource`의 두 가지 바인딩이 있는 것이다.   

## `Hilt`에서 컨테이너 인스턴스 범위지정하기
- `Hilt`는 다른 수명주기를 가진 컨테이너를 생산할 수 있기 때문에 각각에 적용되는 다양한 주석이있다.   
```
@Singleton
class LoggerLocalDataSource @Inject constructor(private val logDao: LogDao) {
    ...
}
```
- Application 컨테이너에 대한 인스턴스 범위를 나타내는 주석은 @Singleton이다.   
	- 이 주석은 다른 유형의 종속성으로 사용되든 필드 주입이 필요하든 상관없이 항상 동일한 인스턴스를 제공하도록 한다.   
	- Android 클래스에 부착된 모든 컨테이너에도 같은 논리를 적용할 수 있다.   
		- 항상 동일한 유형의 인스턴스를 제공하려면 @ActivityScoped를 활용한다.   
- 싱위 컨테이너에서 사용할 수 있는 바인딩은 하위 레벨에서도 사용할 수 있다.
	- Application에서 `LoggerLocalDataSource` 인스턴스를 사용할 경우 activity 및 fragment 컨테이너에서도 사용 가능하다.   
   
`LoggerLocalDataSource` 인스턴스를 제공하려면 `Hilt`에서도 `LogDao` 인스턴스를 제공하는 방법을 알아야한다.    

## `Hilt` modules
```
// di/DataModule.kt

@InstallIn(ApplicationComponent::class)
@Module
object DatabaseModule {

}
```
- module은 `Hilt`에 바인딩을 추가하거나 다른 유형의 인스턴스를 제공하는 방법을 알려주기 위해 사용된다.    
- @Module 및 @InstallIn 으로 annotation을 추가한 클래스이다.   
	- @Module은 `Hilt`에게 해당 클래스가 module 임을 알려준다.   
	- @InstallIn은 `Hilt` 구성 요소를 지정하여 바인딩을 사용할 수 있는 컨테이너를 `Hilt`에 알려준다.   


```
@Module
object DatabaseModule {

    @Provides
    fun provideLogDao(database: AppDatabase): LogDao {
        return database.logDao()
    }
}
```
- 코틀린에서 @Provides 메소드만 포함하는 모듈은 객체 클래스가 될 수 있다.
	- 이러한 방식으로 Provides는 최적화되고 생성된 코드에 인라인으로 연결된다.   
- `Hilt` module에서 @Provides를 메소드에 추가할 수 있어서 `Hilt`에게 생성자가 주입할 수 없는 유형을 제공하는 방법을 알려준다.   
	- @Provides 처리된 메소드의 본체는 `Hilt`가 해당 유형의 인스턴스를 제공해야 할 때마다 실행된다.   
	- @Provides 메소드의 반환 형식은 `Hilt`에게 바인딩 유형 또는 해당 유형의 인스턴스 제공방법을 알려준다.   


```
@InstallIn(ApplicationComponent::class)
@Module
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext appContext: Context): AppDatabase {
        return Room.databaseBuilder(
            appContext,
            AppDatabase::class.java,
            "logging.db"
        ).build()
    }

    @Provides
    fun provideLogDao(database: AppDatabase): LogDao {
        return database.logDao()
    }
}
```
- `AppDatabase`가 전이적 종속성이기 때문에 `Hilt`에게 그러한 유형의 인스턴스를 제공하는 방법도 알려줘야 한다.  
- `AppDatabase`는 Room에서 생성되기 때문에 프로젝트에서 소유하지 않는 또 다른 클래스 이기 때문에 @Provides 함수를 사용하여 제공할 수도 있다.
- `Hilt`가 동일한 데이터베이스 인스턴스를 제공하도록 하기 위해 @Singleton 을 추가하였다.   
- `Hilt` 컨테이너에는 사용자 정의 바인딩에 주입될 수 있는 기본 바인딩이 함께 제공된다.   
	- @ApplicationContext 는 applicationContext를 액세스하기 위해 추가해준다.


```
// ui/MainActivity.kt

@AndroidEntryPoint
class MainActivity : AppCompatActivity() { ... }
```
- 이제 `Hilt`는 LogsFragment에서 인스턴스를 주입하는 데 필요한 모든 정보를 가지고 있다.   
	- 하지만 앱을 실행하기 전에 Fragment를 호스팅하는 Activity를 알아야 작업을 할 수 있다.   
	- @AndroidEntryPoint를 MainActivity에 추가한다.   

## Providing interfaces with @Binds
- AppNavigator는 인터페이스이기 때문에 생성자 주입을 사용할 수 없다.   
- `Hilt`에 인터페이스를 사용하기 위해 @Binds 주석을 사용한다.   
	- @Binds는 abstract 메소드에 추가해야한다.   
		- abstract 이므로 코드를 포함하지 않는다.   
		- 클래스도 absctract이어야 한다.   
		- 여기서 반환 형식은 AppNavigator를 위해 제공하고자 하는 인터페이스이다.   
			- AppNavigatorImpl과 함께 고유한 매개 변수를 추가햐여 지정한다.   
   
이전에 생성한 DatabaseModule에 추가할 수 없는 이유
- module의 이름은 그것이 제공하는 정보의 유형을 전달해야한다.   
	- 예를 들어 DatabaseModule에 Navigation 바인딩을 포함시키는 것은 이상하다.   
- DatabaseModule은 애플리케이션 컨테이너에서 바인딩할 수 있도록 ApplicationComponent에 설치된다.   
	- AppNavigator는 Activity에서 특정 정보를 필요로한다.   
	- 따라서 Activyti에 대한 정보를 사용할 수 있으므로 Application 컨테이너 대신 Activity 컨테이너에 설치해야한다.   
- `Hilt`module은 동일한 클래스에 @Binds와 @Provides 를 동시에 배치할 수 없다. 

```
//di/NavigatorModule.kt

@InstallIn(ActivityComponent::class)
@Module
abstract class NavigationModule {

    @Binds
    abstract fun bindNavigator(impl: AppNavigatorImpl): AppNavigator
}
```
- 모듈 내부에 AppNavigator 바인딩을 추가할 수 있다. 
-`Hilt`에 알려주고 있는 인터페이스를 반환하는 abstract 메소드이며 파라미터로 해당 인터페이스의 implementaion을 받는다.   

```
// navigator/AppNavigatiorImpl
class AppNavigatorImpl @Inject constructor(
    private val activity: FragmentActivity
) : AppNavigator {
    ...
}
```
- AppNavigatorImpl은 FragmentActivity에 의존한다.   
	- AppNavigator 인스턴스는 Activity 컨테이너에 제공되고 FragmentActivity는 사전 정의된 바인딩으로 제공되어 사용할 수 있다.   
- `Hilt`는 AppNavigator 인스턴스를 주입할 수 있는 모든 정보를 가지고 있다. 

```
// ui/MainActivity.kt

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    @Inject lateinit var navigator: AppNavigator
    ...
}
```

- Navigator 필드에 @Inject를 추가한다.   

```
@AndroidEntryPoint
class ButtonsFragment : Fragment() {

    @Inject lateinit var logger: LoggerLocalDataSource
    @Inject lateinit var navigator: AppNavigator

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_buttons, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        ...
    }
}
```
- 유일하게 ButtonsFragment만 ServicLocator를 사용하고있었다.   
	- LogsFragment와 동일한 방법으로 @Inject를 추가하고 ServiceLocator와 관련된 코드를 삭제한다.   
	- 이제 ServiceLocator 클래스는 필요 없게 되었다.


## Qualifiers
다음의 클래스를 data 에 추가한다.   
```
// data/LoggerDataSource.kt

interface LoggerDataSource {
    fun addLog(msg: String)
    fun getAllLogs(callback: (List<Log>) -> Unit)
    fun removeLogs()
}
```
   
`LoggerLocalDataSource`를 `LoggerDataSource`로 변경한다.   
```
// ui/LogsFragment.kt

@AndroidEntryPoint
class LogsFragment : Fragment() {

    @Inject lateinit var logger: LoggerDataSource
    ...
}

// ui/ButtonsFragment.kt

@AndroidEntryPoint
class ButtonsFragment : Fragment() {

    @Inject lateinit var logger: LoggerDataSource
    ...
}
```
   
`LoggerLocalDataSource`에서 `LoggerDataSource` 인터페이스를 구현한다.   
```
@Singleton
class LoggerLocalDataSource @Inject constructor(
    private val logDao: LogDao
) : LoggerDataSource {
    ...
    override fun addLog(msg: String) { ... }
    override fun getAllLogs(callback: (List<Log>) -> Unit) { ... }
    override fun removeLogs() { ... }
}
```
   
이제 로그를 메모리에 보관하는 LoggerInMemoryDataSource를 구현한다.
```Qualifiers
@ActivityScoped
class LoggerInMemoryDataSource @Inject constructor(
) : LoggerDataSource{

    private val logs = LinkedList<Log>()

    override fun addLog(msg: String) {
        logs.addFirst(Log(msg, System.currentTimeMillis()))
    }

    override fun getAllLogs(callback: (List<Log>) -> Unit) {
        callback(logs)
    }

    override fun removeLogs() {
        logs.clear()
    }
}
```
- Activity 컨테이너 범위 지정
	- `Hilt`에 @Inject 를 사용하여 제공하는 방법을 알려준다.   
- Application은 단일 Activity로 구성된다.   
	- Activity 컨테이너에 LoggerInMemoryDataSource 인스턴스가 있어야 하며 Fragment에서 해당 Instance를 재사용 해야한다.   
- LoggerInMeomoryDataSource를 Activity 컨테이너 범위로 지정하여 메모리 내 로깅 동작을 수행할 수 있다.   
	- 생성된 모든 Activity는 다른 다른 고유한 컨테이너를 가질 수 있다.   
	- 컨테이너에서 Logger가 필요한 경우 LoggerInMemoryDataSource 인스턴스가 제공된다.   
- Activity 컨테이너에 유형을 적용하려면 @ActivityScoped 를 추가해야한다.   
   
`Hilt`는 LoggerInMemoryDataSource, LoggerLocalDataSource의 인스턴스를 제공하는 방법을 알고 있다. 하지만 LoggerDataSource는 알고있지 않다. module의 주석을 사용하여 `Hilt`에 어떤 구현을 사용해야 하는지 알려줄 수 있다. 여기서 동일한 프로젝트에서 두 구현을 모두 제공해야한다면? 
```
//di/LoggingDatabaseModule.kt

@InstallIn(ApplicationComponent::class)
@Module
abstract class LoggingDatabaseModule {

    @Singleton
    @Binds
    abstract fun bindDatabaseLogger(impl: LoggerLocalDataSource): LoggerDataSource
}

@InstallIn(ActivityComponent::class)
@Module
abstract class LoggingInMemoryModule {

    @ActivityScoped
    @Binds
    abstract fun bindInMemoryLogger(impl: LoggerInMemoryDataSource): LoggerDataSource
}
```
- @Binds 메소드의 유형이 범위 지정인 경우 범위지정 annotaition이 필요하다.   
	- @Singleton, @ActivityScoped   
- @Binds나 @Provides를 어떤 타입의 바인딩으로 사용할 경우, 타입 범위 지정 주석을 다른 구현 클래스에서 제거하면 된다.   
   

Fragment는 LoggerDataSource 타입이 주입되고있지만 `Hilt`는 같은 타입의 바인딩이 2개일 때 어떤 구현을 사용해야 할지 모른다. Qualifiers(한정자)를 사용하면 동일한 유형의 복수 바인딩을 제공하는 방법을 `Hilt`에 알려줄 수 있다.   

```
@Qualifier
annotation class InMemoryLogger

@Qualifier
annotation class DatabaseLogger

@InstallIn(ApplicationComponent::class)
@Module
abstract class LoggingDatabaseModule {

    @DatabaseLogger
    @Singleton
    @Binds
    abstract fun bindDatabaseLogger(impl: LoggerLocalDataSource): LoggerDataSource
}

@InstallIn(ActivityComponent::class)
@Module
abstract class LoggingInMemoryModule {

    @InMemoryLogger
    @ActivityScoped
    @Binds
    abstract fun bindInMemoryLogger(impl: LoggerInMemoryDataSource): LoggerDataSource
}
```
- @Qualifier는 바인딩을 식별하는데 사용한다.   
	- 각 한정자는 구현 별로 한정자를 정의해야한다.   
	- 클래스에 유형을 주입하거나 해당 유형을 다른클래스의 종속성으로 가질 때는 Qualifier를 사용하여 모호성을 방지할 필요가 있다. 
	- 주입하고자 하는 구현과 함께 주입 지점에서 사용되어야 한다.   
		- 예제의 경우 Fragment에 LoggerInMemoryDataSource를 구현해 사용한다.   
	
	!! @DatabaseLogger 한정자가 ApplicationComponent에 설치되므로 LogApplication 클래스에 주입할 수 있다. 그러나 @InMemoryLogger가 ActivityComponent에 설치되어 있으므로 애플리케이션 컨테이너가 해당 바인딩에 대해 모르기 때문에 LogApplication 클래스에 주입할 수 없다.   


```
	@AndroidEntryPoint
class LogsFragment : Fragment() {

    @InMemoryLogger
    @Inject lateinit var logger: LoggerDataSource
    ...
}


@AndroidEntryPoint
class ButtonsFragment : Fragment() {

    @InMemoryLogger
    @Inject lateinit var logger: LoggerDataSource
    ...
}
```
- @InMemoryLogger 한정자를 사용하여 `Hilt`에게 LoggerInMemoryDataSource 인스턴스를 주입하지 않도록 설정한다.   
- 구현을 변경하려면 @DatabaseLogger로 변경하기만 하면 된다.

## UI Testing
- 이제 예제 앱이 `Hilt`로 완전히 마이그레이션 되었다. 기존에 있던 계측테스트도 마이그레이션 할 수 있다.
	- 테스트는 에뮬레이터에서 실행된다.   
	- hapyy() 테스트는 Button1 의 탭이 데이터베이스에 기록되어있음을 확인한다.  
	- InMemoryDatabase 를 사용하고 있기 때문에 모든 테스트가 끝나면 로그가 사라진다.   
   
`Hilt`는 실제 코드와 같이 UI 테스트에 의존성을 주입할 것이다. 각 테스트에 대해 자동으로 새로운 구성요소를 생성하기 때문에 `Hilt`를 사용한 테스트는 유지보수가 필요없다.
```
// bulid.gradle(Module)

dpendencies {
    // Hilt testing dependency
    androidTestImplementation "com.google.dagger:hilt-android-testing:$hilt_version"
    // Make Hilt generate code in the androidTest folder
    kaptAndroidTest "com.google.dagger:hilt-android-compiler:$hilt_version"

```
- `Hilt`는 더 쉽게 테스트할 수 있도록 테스트별 주석이 있는 추가 라이브러리를 사용한다.   
- AndroidTest 폴더에서 클래스에 대한 코드를 생성해야 하므로 주석 처리기도 실행될수 있어야한다.   
- `Hilt`를 사용하는 테스트는 `Hilt`를 지원하는 애플리케이션에서 실행되어야 한다.   
- `Room`은 이미 UI 테스트를 실행할 수 있는 `HiltTestApplication`과 함께 제공된다.   
   
테스트에 사용할 Application을 지정하는 것은 프로젝트에서 새로운 테스트 Runner를 생성함으로 써 이루어진다.   
```
// androidTest

class CustomTestRunner : AndroidJUnitRunner() {

    override fun newApplication(cl: ClassLoader?, name: String?, context: Context?): Application {
        return super.newApplication(cl, HiltTestApplication::class.java.name, context)
    }
}
```
   
- 다음으로,  Runner를 Test에 사용하라고 프로젝트에 알려줄 필요가 있다.    
	 - app/build.gradle 파일의 testInstrumentRunner 특성에 지정되어 있다.    
		 - 파일을 열고 기본 testInstrupmentRunner 콘텐츠를 다음으로 교체한다.   

```
// build.gradle(Module)

android {
    ...
    defaultConfig {
        ...
        testInstrumentationRunner "com.example.android.hilt.CustomTestRunner"
    }
    ...
}

```
 
 
`Hilt`를 사용하는 테스트 실행
```
@RunWith(AndroidJUnit4::class)
@HiltAndroidTest
class AppTest {

    @get:Rule
    var hiltRule = HiltAndroidRule(this)

    ...
}
```
- 에뮬레이터 테스트 클래스가 힐트를 사용하려면 다음을 수행해야 한다.   
	- 각 테스트에 대해 `Hilt` 구성요소 생성을 담당하는 @HiltAndroidTest를 추가한다.   
	- 구성요소의 사애를 관리하고 테스트에 주입하는데 사용되는 HiltAndroidRule을 사용한다.


## @EntryPoint annotation
- `Hilt`가 지원하지 않는 클래스에 종속성을 주입하는 데 사용되는 @EntryPoint의 사용방법을 알아보자.   
 - `Hilt`는 가장 일반적인 안드로이드 컴포넌트에 대한 지원을 받는다.   
	 - 직접 지원하지 않거나 사용할 수 없는 클래스에선 @EntryPoint를 사용할 수 있다.   
   
사용 사례
로그를 애플리케이션 프로세스 밖으로 내보내길 원한다. 그러기 위해선 ContentProvider를 이용해야 한다. 특정 로그 또는 앱의 모든 로그를 조회할 수 있도록 허용한다. 데이터를 검색하기 위해 `Room`을 사용할 것이다. 따라서 `LogDao`클래스는 데이터베이스 커서를 사용하여 필요한 정보를 반환하는 방법을 노출해야 한다.   

```
// data/LogDao.kt

@Dao
interface LogDao {
    ...

    @Query("SELECT * FROM logs ORDER BY id DESC")
    fun selectAllLogsCursor(): Cursor

    @Query("SELECT * FROM logs WHERE id = :id")
    fun selectLogById(id: Long): Cursor?
}
```
   
ContentProvider 클래스를 만들고 쿼리 방법을 재정의하여 로그와 함께 커서를 반환해야 한다.
```
/** The authority of this content provider.  */
private const val LOGS_TABLE = "logs"

/** The authority of this content provider.  */
private const val AUTHORITY = "com.example.android.hilt.provider"

/** The match code for some items in the Logs table.  */
private const val CODE_LOGS_DIR = 1

/** The match code for an item in the Logs table.  */
private const val CODE_LOGS_ITEM = 2

/**
 * A ContentProvider that exposes the logs outside the application process.
 */
class LogsContentProvider: ContentProvider() {

    private val matcher: UriMatcher = UriMatcher(UriMatcher.NO_MATCH).apply {
        addURI(AUTHORITY, LOGS_TABLE, CODE_LOGS_DIR)
        addURI(AUTHORITY, "$LOGS_TABLE/*", CODE_LOGS_ITEM)
    }

    override fun onCreate(): Boolean {
        return true
    }

    /**
     * Queries all the logs or an individual log from the logs database.
     *
     * For the sake of this codelab, the logic has been simplified.
     */
    override fun query(
        uri: Uri,
        projection: Array<out String>?,
        selection: String?,
        selectionArgs: Array<out String>?,
        sortOrder: String?
    ): Cursor? {
        val code: Int = matcher.match(uri)
        return if (code == CODE_LOGS_DIR || code == CODE_LOGS_ITEM) {
            val appContext = context?.applicationContext ?: throw IllegalStateException()
            val logDao: LogDao = getLogDao(appContext)

            val cursor: Cursor? = if (code == CODE_LOGS_DIR) {
                logDao.selectAllLogsCursor()
            } else {
                logDao.selectLogById(ContentUris.parseId(uri))
            }
            cursor?.setNotificationUri(appContext.contentResolver, uri)
            cursor
        } else {
            throw IllegalArgumentException("Unknown URI: $uri")
        }
    }

    override fun insert(uri: Uri, values: ContentValues?): Uri? {
        throw UnsupportedOperationException("Only reading operations are allowed")
    }

    override fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<out String>?
    ): Int {
        throw UnsupportedOperationException("Only reading operations are allowed")
    }

    override fun delete(uri: Uri, selection: String?, selectionArgs: Array<out String>?): Int {
        throw UnsupportedOperationException("Only reading operations are allowed")
    }

    override fun getType(uri: Uri): String? {
        throw UnsupportedOperationException("Only reading operations are allowed")
    }
}
```
- getLogDao(appContext) 호출이 컴파일되지 않을것이다.   
	- `Hilt` 애플리케이션 컨테이너에서 LogDao 종속성을 잡아 그것을 구현해야 한다.    
		- 그러나 힐트는 예를 들어 @AndroidEntryPoint와 같은 Activity에서처럼 즉시 제공되는 ContentProvider에 대한 주입을 지원하지 않는다.   
			- @EntryPoint로 주석을 달아서 접속할 수 있는 새로운 인터페이스를 만들어야 한다.   

```
class LogsContentProvider: ContentProvider() {

    @InstallIn(ApplicationComponent::class)
    @EntryPoint
    interface LogsContentProviderEntryPoint {
        fun logDao(): LogDao
    }

    ...
}
```
- @EntryPoint in action
	- 원하는 각 바인딩 유형(한정자 포함)에 대한 접근자 방법을 가진 인터페이스다.    
	- 진입점을 설치할 구성요소를 지정하려면 인터페이스에 @InstallIn으로 주석을 달아야 한다.   
- 가장 좋은 방법은 그것을 사용하는 클래스 안에 새로운 EntryPoint 인터페이스를 추가하는 것이다.   
   
```
class LogsContentProvider: ContentProvider() {
    ...

    private fun getLogDao(appContext: Context): LogDao {
        val hiltEntryPoint = EntryPointAccessors.fromApplication(
            appContext,
            LogsContentProviderEntryPoint::class.java
        )
        return hiltEntryPoint.logDao()
    }
}
```
- applicationContext를 정적 EntryPoints.get 메서드와 @EntryPoint로 주석을 붙인 인터페이스 클래스로 전달하는 방법을 기억하자.

## end
- 애플리케이션 클래스에서 @HiltAndroidApp을 사용하여 `Hilt`를 설정하는 방법.   
- @AndroidEntryPoint를 사용하여 여러 Android 수명주기 구성 요소에 종속 컨테이너를 추가하는 방법.   
- moudle을 사용하여 `Hilt`에게 특정 유형을 제공하는 방법을 알림.   
- Qualifier를 사용하여 특정 유형에 대해 여러 바인딩을 제공하는 방법.      
- `Hilt`를 사용하여 앱을 테스트하는 방법.   
- `@EntryPoint`  사용하는 방법.

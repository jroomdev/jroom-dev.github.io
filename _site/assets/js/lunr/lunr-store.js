var store = [{
        "title": "android navigation drawer - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin Script Kotlin home ㄴ HomeActivity.kt note ㄴ NoteActivity.kt notice ㄴ NoticeActivity.kt util ㄴ AppcompatActivityExt.kt Resource (xml) layout ㄴ home_act.xml ㄴ note_act.xml ㄴ notice_act.xml ㄴ nav_header.xml menu ㄴ drawer_actions.xml HomeActivity in onCreate setupActionBar(R.id.toolbar) { setHomeAsUpIndicator(R.drawable.ic_menu) setDisplayHomeAsUpEnabled(true) } setupNavigationDrawer() setupActionBar() -&gt; util/AppcompatActivityExt.kt 에 선언되어 있음 -&gt; 거의 모든 액티비티에서 호출...","categories": ["android-kotlin"],
        "tags": ["Kotlin","AndroidUI","Android","MVVM"],
        "url": "http://localhost:4000/android-kotlin/android-navigation-drawer-kotlin-mvvm/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "android local & remote data source - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin Script Kotlin data source BookmarkRepository.kt remote BookmarkRemoteDataSource.kt (mock) Injection.kt data/source/BookmarkRemoteDataSource.kt object BookmarkRemoteDataSource : BookmarkDataSource { private const val SERVICE_LATENCY_IN_MILLIS = 5000L private var BOOKMARKS_SERVICE_DATA = LinkedHashMap&lt;String, Bookmark&gt;(2) init { addBookmark(\"Google\", \"Portal\",\"https://www.google.com\") addBookmark(\"Naver\", \"Portal\",\"https://www.naver.com\") addBookmark(\"Daum\", \"Portal\",\"https://www.daum.net\") } private fun addBookmark(title: String, category: String, url: String) { val newBookmark =...","categories": ["android-kotlin"],
        "tags": ["Kotlin","Android","MVVM","Database"],
        "url": "http://localhost:4000/android-kotlin/android-local-remote-data-source-kotlin/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "android room local database - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin Bookmark Script Kotlin data Bookmark.kt source BookmarkDataSource.kt BookmarkRepository.kt local BookmarkDatabase.kt BookmarkDao.kt BookmarkLocalDataSource.kt util AppExecutors.kt DiskIOThreadExecutor.kt Bookmark.kt @Entity(tableName= \"bookmarks\") data class Bookmark @JvmOverloads constructor ( @NonNull @PrimaryKey @ColumnInfo(name = \"id\") var id: String = UUID.randomUUID().toString(), @NonNull @ColumnInfo(name= \"title\") var title: String = \"\", @NonNull @ColumnInfo(name= \"url\") var url: String...","categories": ["android-kotlin"],
        "tags": ["Kotlin","Android","Database","MVVM"],
        "url": "http://localhost:4000/android-kotlin/android-room-local-database-kotlin/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "How to format date time in room database - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin https://medium.com/androiddevelopers/room-time-2b4cf9672b98 https://developer.android.com/training/data-storage/room/referencing-data?hl=ko home/HomeFilterType.kt enum class HomeFilterType { RECENT_BOOKMARKS, CATEGORY_BOOKMARKS, } 위처럼 Bookmark를 보여줄 home activity에 Recent와 Category로 나누어 데이터를 뿌려줄 계획임 Recent의 경우 최근에 북마크를 생성 or 클릭 한 순서대로 뿌려줄 계획이라 Date Type의 컬럼이 필요함 data/source/Bookmark.kt @Entity(tableName = \"bookmarks\") data class Bookmark @JvmOverloads constructor( @NonNull @ColumnInfo(name =...","categories": ["android-kotlin"],
        "tags": ["Kotlin","MVVM","Android","Database"],
        "url": "http://localhost:4000/android-kotlin/how-to-format-date-time-in-room-database-kotlin/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "Data structure 1 - Kotlin Collections Overview",
        "excerpt":"참고자료 https://www.tutorialspoint.com/data_structures_algorithms/index.html 코틀린 학습 + 영어 공부를 위해 kotlin 가이드 문서를 번역함 Kotlin Collections Overview 코틀린 표준 라이브러리는 항목 그룹으로 구성된 컬렉션 관리를 위한 포괄적 도구 세트를 제공하며, 이러한 툴은 해결된 문제에 대한 중요성을 공유하고 공통적으로 운영된다. 컬렉션은 일반적으로 동일한 유형의 여러 객체를 포함한다. 컬렉션안의 객체(object)를 요소(elements) 또는 items라고 한다....","categories": ["programming-theory"],
        "tags": ["Kotlin","DataStructure","KotlinDocs"],
        "url": "http://localhost:4000/programming-theory/data-structure-1-kotlin-data-structure/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "Android Intro Activity - animations using lottie",
        "excerpt":"참고자료 https://www.youtube.com/watch?v=n7XTizCon0A https://developer.android.com/kotlin/coroutines?hl=ko https://lottiefiles.com/ build.gradle implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9' implementation 'com.airbnb.android:lottie:3.4.0' res/values/styles.xml &lt;style name=\"AppTheme\" parent=\"Theme.AppCompat.Light.NoActionBar\"&gt; ... &lt;/style&gt; &lt;style name=\"FullScreen\" parent=\"AppTheme\"&gt; &lt;item name=\"android:windowNoTitle\"&gt;true&lt;/item&gt; &lt;item name=\"android:windowActionBar\"&gt;false&lt;/item&gt; &lt;item name=\"android:windowFullscreen\"&gt;true&lt;/item&gt; &lt;item name=\"android:windowContentOverlay\"&gt;@null&lt;/item&gt; &lt;/style&gt; AppTheme은 안드로이드 프로젝트 생성 시 디폴트로 생성되는 테마이다. 이것을 NoActionBar로 지정한다. (추후 ActionBar는 필요시 toolbar를 추가해서 구현) 로 새로운 stype의 테마를 지정할 수...","categories": ["android-ui"],
        "tags": ["Kotlin","AndroidUI","AnroidAnimation"],
        "url": "http://localhost:4000/android-ui/android-intro-activity-animations-using-lottie/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "Data structure 2 - Kotlin Constructing Collections",
        "excerpt":"참고자료   https://kotlinlang.org/docs/reference/constructing-collections.html   코틀린 학습 + 영어 공부를 위해 kotlin 가이드 문서를 번역함   Kotlin Constructing Collections  ","categories": [],
        "tags": [],
        "url": "http://localhost:4000/data-structure-2-kotlin-constructing-collections/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "Java와 Kotlin을 비교하면서 알아보는 객체지향 프로그래밍(OOP) 1 - Class",
        "excerpt":"참고자료 https://opentutorials.org/course/743/6553 https://wikidocs.net/214 https://kotlinlang.org/docs/reference/classes.html https://gmlwjd9405.github.io/2018/09/17/class-object-instance.html Class // java class Car {} // kotlin class Car {} 가장 간단한 형태의 클래스이다. 자바와 코틀린의 문법상의 차이는 없다. (현재까지는..) 클래스의 선언만 있고 내용은 없는 껍데기 클래스이다. 하지만 이러한 껍데기라도 중요한 기능을 가지고 있다. 객체를 생성하는 기능이다. 다음과 같이 만들 수 있다. //java Car...","categories": ["JavaAndKotlin"],
        "tags": ["OOP"],
        "url": "http://localhost:4000/javaandkotlin/java-kotlin-oop/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      }]

var store = [{
        "title": "android navigation drawer - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin Script Kotlin home ㄴ HomeActivity.kt note ㄴ NoteActivity.kt notice ㄴ NoticeActivity.kt util ㄴ AppcompatActivityExt.kt Resource (xml) layout ㄴ home_act.xml ㄴ note_act.xml ㄴ notice_act.xml ㄴ nav_header.xml menu ㄴ drawer_actions.xml HomeActivity in onCreate setupActionBar(R.id.toolbar) { setHomeAsUpIndicator(R.drawable.ic_menu) setDisplayHomeAsUpEnabled(true) } setupNavigationDrawer() setupActionBar() -&gt; util/AppcompatActivityExt.kt 에 선언되어 있음 -&gt; 거의 모든 액티비티에서 호출...","categories": ["android-kotlin"],
        "tags": ["Kotlin","AndroidUI","Android","MVVM"],
        "url": "http://localhost:4000/android-kotlin/android-navigation-drawer-kotlin-mvvm/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      },{
        "title": "android room local database - kotlin",
        "excerpt":"참고자료 https://github.com/ll0301/architecture-samples/tree/todo-mvvm-live-kotlin Bookmark Script Kotlin data Bookmark.kt source BookmarkDataSource.kt BookmarkRepository.kt local BookmarkDatabase.kt BookmarkDao.kt BookmarkLocalDataSource.kt util AppExecutors.kt DiskIOThreadExecutor.kt Bookmark.kt @Entity(tableName= \"bookmarks\") data class Bookmark @JvmOverloads constructor ( @NonNull @PrimaryKey @ColumnInfo(name = \"id\") var id: String = UUID.randomUUID().toString(), @NonNull @ColumnInfo(name= \"title\") var title: String = \"\", @NonNull @ColumnInfo(name= \"url\") var url: String...","categories": ["android-kotlin"],
        "tags": ["Kotlin","Android","Database","MVVM"],
        "url": "http://localhost:4000/android-kotlin/android-room-local-database-kotlin/",
        "teaser": "http://localhost:4000/assets/images/background/teaser1.jpg"
      }]

declare namespace App {
	
	namespace Profile {
		interface Theme {
			themeSchema: "light" | "dark"
		};
		interface Setting {
			topNav: false,
			tagViews: true,
			tagIcon: false,
			sideBarLogo : true,
		}
	}
}

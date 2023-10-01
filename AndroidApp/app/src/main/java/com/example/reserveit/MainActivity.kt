package com.example.reserveit

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material.Scaffold
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.runtime.Composable
import androidx.navigation.compose.rememberNavController
import com.example.reserveit.app.component.Bottomnavigationbar
import com.example.reserveit.app.navigation.BottomNavItem
import com.example.reserveit.app.navigation.Navigation
import com.example.reserveit.app.navigation.Routes
import com.example.reserveit.ui.theme.ReserveItTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ReserveItTheme {
                ReserveItApp()
            }
        }
    }




    @SuppressLint("UnusedMaterialScaffoldPaddingParameter")
    @Composable
    fun ReserveItApp(){
        val navController = rememberNavController()
        Scaffold(
            topBar = {

            },
            bottomBar = {
                Bottomnavigationbar(items = listOf(
                    BottomNavItem(
                        route = Routes.HOME_SCREEN,
                        icon = Icons.Filled.Home,
                        title = "Home",
                        badgeCount = 0
                    ),
                    BottomNavItem(
                        route = Routes.RESERVATION_SCREEN,
                        icon = Icons.Filled.Home,
                        title = "Reservations",
                        badgeCount = 0
                    ),
                    BottomNavItem(
                        route = Routes.PROFILE_SCREEN,
                        icon = Icons.Filled.Home,
                        title = "Profile",
                        badgeCount = 0
                    ),
                ), onItemClick = {
                    navController.navigate(it.route)
                }, navController = navController
                )
            }
        ) {
            Navigation(navController = navController)
        }
    }
}


package com.example.reserveit.app.navigation
import androidx.compose.runtime.Composable
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.reserveit.app.screen.HomeScreen
import com.example.reserveit.app.screen.LoginScreen
import com.example.reserveit.app.screen.ProfileScreen
import com.example.reserveit.app.screen.ReservationScreen


@Composable
fun Navigation(
    navController: NavHostController
){

    NavHost(navController = navController, startDestination = Routes.HOME_SCREEN){
        composable(Routes.LOGIN_SCREEN){
            LoginScreen();
        }
        composable(Routes.HOME_SCREEN){
            HomeScreen(navController = navController);
        }
        composable(Routes.RESERVATION_SCREEN){
            ReservationScreen(navController = navController);
        }
        composable(Routes.PROFILE_SCREEN){
            ProfileScreen(navController = navController);
        }


    }
}
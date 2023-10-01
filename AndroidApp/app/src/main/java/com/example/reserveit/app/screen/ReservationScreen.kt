package com.example.reserveit.app.screen

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController


@Composable
fun ReservationScreen(
    navController: NavController
){
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colors.background
    ) {
        Text(text ="Reservation Screen")
    }
}


@Preview
@Composable
fun ReservationScreenPreview(){
    val navController = rememberNavController();
    ReservationScreen(navController)
}
package com.example.reserveit.app.navigation

import androidx.compose.ui.graphics.vector.ImageVector

data class BottomNavItem(
    val title: String,
    val icon: ImageVector,
    val route:String,
    val badgeCount: Int = 0
)

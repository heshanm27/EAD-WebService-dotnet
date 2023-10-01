package com.example.reserveit.app.component

import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.reserveit.app.navigation.BottomNavItem

@Composable
fun Bottomnavigationbar(
    items: List<BottomNavItem>,
    onItemClick: (BottomNavItem) -> Unit,
    modifier: Modifier = Modifier,
    navController: NavController,
) {
    val backStackEntry = navController.currentBackStackEntry
    BottomNavigation(
        modifier = modifier,
        backgroundColor = MaterialTheme.colors.onBackground,
        elevation = 5.dp
    )
    {

        items.forEach { item ->
            val selected = item.route == backStackEntry?.destination?.route;
            BottomNavigationItem(
                selected = selected,
                onClick = {
                    onItemClick(item)
                },
                icon = {
                    item.icon
                },

                label = {
                    item.title
                },
                selectedContentColor = MaterialTheme.colors.primary,
                unselectedContentColor = MaterialTheme.colors.onSurface,
            )
        }

    }
}
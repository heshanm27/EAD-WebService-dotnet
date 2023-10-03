package com.example.reserveit.app.component

import androidx.compose.foundation.layout.padding
import androidx.compose.material.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.reserveit.app.navigation.BottomNavItem

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomNavigationBar(
    items: List<BottomNavItem>,
    onItemClick: (BottomNavItem) -> Unit,
    modifier: Modifier = Modifier,
    navController: NavController,
) {
    val backStackEntry = navController.currentBackStackEntry
    NavigationBar()
    {

        items.forEach { item ->
            val selected = item.route == backStackEntry?.destination?.route;
            NavigationBarItem(
                selected = selected,
                modifier = Modifier.padding(5.dp),



                onClick = {
                    onItemClick(item)
                },

                label = {
                    Text(text = item.title)
                },
                icon = {
                    BadgedBox(
                        badge = {
                            if(item.badgeCount != null) {
                                Badge {
                                    Text(text = item.badgeCount.toString())
                                }
                            }
                        }
                    ) {
                        Icon(
                            imageVector = if (selected) {
                                item.icon
                            } else item.icon,
                            contentDescription = item.title
                        )
                    }
                }
            )
        }

    }
}


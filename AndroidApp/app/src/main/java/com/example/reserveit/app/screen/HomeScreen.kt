package com.example.reserveit.app.screen
import android.annotation.SuppressLint
import android.util.Log
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController



@OptIn(ExperimentalMaterial3Api::class)
@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun HomeScreen(
    navController: NavController,
) {
    val scope = rememberCoroutineScope()
    val scaffoldState = rememberBottomSheetScaffoldState(

    )
    val screenHeight = LocalConfiguration.current.screenHeightDp
    val sheetPeekHeight = (screenHeight / 2).dp

    BottomSheetScaffold(
        scaffoldState = scaffoldState,
        sheetPeekHeight =sheetPeekHeight - 56.dp,
        sheetShape = RoundedCornerShape(topStart = 36.dp, topEnd = 36.dp),
        sheetContent = {
            MyBottomSheet()

        }) { innerPadding ->
        Box(Modifier.padding(innerPadding).fillMaxSize()) {
            Text("Scaffold Content", modifier = Modifier.align(Alignment.Center))
        }
    }
}

@Composable
fun MyBottomSheet() {
    Column(
        modifier = Modifier
            .fillMaxSize()//Do this to make sheet expandable
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Bottom Sheet")
    }
}
@Composable
@Preview
fun HomeScreenPreview() {
    val navController = rememberNavController()
    HomeScreen(
        navController
    )
}

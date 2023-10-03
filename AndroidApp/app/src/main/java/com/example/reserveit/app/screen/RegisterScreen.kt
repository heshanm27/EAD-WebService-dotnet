package com.example.reserveit.app.screen

import androidx.compose.foundation.layout.fillMaxWidth

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview


@Composable
fun RegisterScreen(

){
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.background
    ) {
        Text(text ="Register  Screen")
    }
}


@Preview
@Composable
fun RegisterScreenPreview(){
    RegisterScreen()
}
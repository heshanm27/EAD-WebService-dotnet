package com.example.reserveit.models.login

import com.google.gson.annotations.SerializedName

/*
* File: LoginModel.kt
* Author:
* Description: This class is used to store login information.
* */

data class LoginModel (
    val data: Data,
    val status: Boolean,
    val message: String
)

data class Data (
    val token: String,
    val firstName: String,
    val lastName: String,

    @SerializedName( "avatarUrl")
    val avatarURL: String,

    val role: String
)

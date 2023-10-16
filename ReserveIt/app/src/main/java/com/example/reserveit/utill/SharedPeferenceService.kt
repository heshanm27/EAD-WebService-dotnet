package com.example.reserveit.util // Corrected package name

import android.content.Context
import android.content.SharedPreferences
import com.google.gson.Gson

object SharedPreferenceService {

    private lateinit var sharedPreferences: SharedPreferences // Initialize later

    // Initialize the sharedPreferences in your Application class
    fun initialize(context: Context) {
        sharedPreferences = context.getSharedPreferences("my_shared_preferences", Context.MODE_PRIVATE)
    }

    fun saveValue(key: String, value: String) {
        sharedPreferences.edit().putString(key, value).apply()
    }

    fun saveObject(key: String, value: Any){
        val gson = Gson()
        val jsonString = gson.toJson(value)
        sharedPreferences.edit().putString(key, jsonString).apply()
    }

    fun loadObject(key: String, classType: Class<*>): Any? {
        val jsonString = sharedPreferences.getString(key, null)
        val gson = Gson()
        return gson.fromJson(jsonString, classType)
    }

    fun clearAll() {
        sharedPreferences.edit().clear().apply()
    }

}
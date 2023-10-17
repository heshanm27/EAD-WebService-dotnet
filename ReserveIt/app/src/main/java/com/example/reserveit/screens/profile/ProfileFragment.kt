package com.example.reserveit.screens.profile

import android.content.SharedPreferences
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentLoginBinding
import com.example.reserveit.databinding.FragmentProfileBinding
import com.example.reserveit.models.login.LoginModel
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants
import com.google.gson.Gson

/*
* File: ProfileFragment.kt
* Author:
* Description: This class is used to display user profile.
* */

class ProfileFragment : Fragment() {

    private var binding: FragmentProfileBinding ?= null
    private lateinit var viewModel: ProfileViewModel

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.showBottomNavigationView()
        binding!!.signInButton.setOnClickListener {
                findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.loadObject(AppConstants.USER_DATA, LoginModel::class.java)


        if (sharedPreferences != null && sharedPreferences is LoginModel) {
            binding!!.signInRequiredLayout.visibility = View.GONE
            binding!!.profileLayout.visibility = View.VISIBLE
            binding!!.userName.text = sharedPreferences.data.firstName + " " + sharedPreferences.data.lastName
           Log.d("sharedPreferences", sharedPreferences.data.toString())
        }

        binding!!.pastReservation.setOnClickListener {
            findNavController().navigate(R.id.action_profileFragment_to_pastReservationFragment)
        }

        binding!!.logOut.setOnClickListener {
            SharedPreferenceService.clearAll()
            binding!!.signInRequiredLayout.visibility = View.VISIBLE
            binding!!.profileLayout.visibility = View.GONE
        }


        return binding!!.root
    }



}
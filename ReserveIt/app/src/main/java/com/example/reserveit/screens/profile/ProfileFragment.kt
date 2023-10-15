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
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentLoginBinding
import com.example.reserveit.databinding.FragmentProfileBinding
import com.example.reserveit.util.SharedPreferenceService
import com.example.reserveit.utill.AppConstants

/*
* File: ProfileFragment.kt
* Author:
* Description: This class is used to display user profile.
* */

class ProfileFragment : Fragment() {

    private var binding: FragmentProfileBinding ?= null
    private lateinit var viewModel: ProfileViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater, container, false)

        binding!!.signInButton.setOnClickListener {
                findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
        SharedPreferenceService.initialize(requireContext())
        val sharedPreferences =  SharedPreferenceService.getString(AppConstants.TOKEN_KEY, "")

        if (sharedPreferences != null) {
            if (sharedPreferences.isNotEmpty()){
            Log.d("ggtoken", sharedPreferences)
            }
        }

        if (sharedPreferences != null) {
            if (sharedPreferences.isNotEmpty()){
                    binding!!.signInRequiredLayout.visibility = View.GONE
                    binding!!.profileLayout.visibility = View.VISIBLE
            }
        }


        binding!!.logOut.setOnClickListener {
            SharedPreferenceService.cleatvalue()
            binding!!.signInRequiredLayout.visibility = View.VISIBLE
            binding!!.profileLayout.visibility = View.GONE
        }


        return binding!!.root
    }



}
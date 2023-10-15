package com.example.reserveit.screens.signUp

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentProfileBinding
import com.example.reserveit.databinding.FragmentResrevationBinding
import com.example.reserveit.databinding.FragmentSignUpBinding
import com.example.reserveit.dto.auth.SignUpRequestBody
import com.example.reserveit.repo.AuthRepo
import com.example.reserveit.screens.resrevation.ResrevationViewModel
import com.example.reserveit.util.SharedPreferenceService

/*
* File: SignUpFragment.kt
* Author:
* Description: This class is used to display sign up screen.
* */

class SignUpFragment : Fragment() {


    private lateinit var viewModel: SignUpViewModel
    private var binding : FragmentSignUpBinding?= null


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentSignUpBinding.inflate(inflater, container, false)
        val authRepo = AuthRepo()
        viewModel = SignUpViewModel(authRepo, requireContext())


        binding!!.topAppBar.setNavigationOnClickListener {
            requireActivity().onBackPressed()
        }

        binding!!.topAppBar.setOnMenuItemClickListener() { menuItem ->
            when (menuItem.itemId) {
                R.id.log_in -> {
                    requireActivity().onBackPressed()
                    true
                }
                else -> false
            }
        }

        binding!!.signUpBtn.setOnClickListener {
            val firstName = binding!!.firstNameEditText.text.toString()
            val lastName = binding!!.lastNameEditText.text.toString()
            val email = binding!!.emailEditText.text.toString()
            val password = binding!!.passwordEditText.text.toString()
            val confirmPassword = binding!!.confirmPasswordEditText.text.toString()
            val nic = binding!!.nicEditText.text.toString()
            val signUpRequestBody = SignUpRequestBody(firstName,lastName, email, password, confirmPassword,nic )
            viewModel.signUp(signUpRequestBody)
        }

        return  binding!!.root

    }



}
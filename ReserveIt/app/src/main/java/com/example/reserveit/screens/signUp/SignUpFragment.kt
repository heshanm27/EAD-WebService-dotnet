package com.example.reserveit.screens.signUp

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.widget.doOnTextChanged
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

        binding!!.signUpBtn.isEnabled = false

        binding!!.firstNameTextInputLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.length < 3){
                binding!!.firstNameTextInputLayout.error = "First name must be at least 3 characters"
            }else{
                if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                    binding!!.signUpBtn.isEnabled = true
                }
                binding!!.firstNameTextInputLayout.error = null
            }
            if(text.isEmpty()){
                binding!!.firstNameTextInputLayout.error = "First name is required"
            }
        }

        binding!!.lastNameTextInputLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.length < 3){
                binding!!.lastNameTextInputLayout.error = "Last name must be at least 3 characters"
            }else{
                if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                    binding!!.signUpBtn.isEnabled = true
                }
                binding!!.lastNameTextInputLayout.error = null
            }
            if(text.isEmpty()){
                binding!!.lastNameTextInputLayout.error = "Last name is required"
            }
        }

        binding!!.emailEditTextLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.isNotEmpty()) {
                binding!!.emailEditTextLayout.error = null

                val emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+"
                val isValidEmail = text.matches(emailPattern.toRegex())

                if (isValidEmail) {
                } else {
                    if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                        binding!!.signUpBtn.isEnabled = true
                    }
                    binding!!.emailEditTextLayout.error = "Invalid email address"
                }
            }else{
                binding!!.emailEditTextLayout.error = "Email is required"
            }
        }

        binding!!.passwordEditTextLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.isNotEmpty()) {

                if(text.length < 6){
                    binding!!.passwordEditTextLayout.error = "Password must be at least 6 characters"
                }else{
                    if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                        binding!!.signUpBtn.isEnabled = true
                    }
                    binding!!.passwordEditTextLayout.error = null
                }
            }else{
                binding!!.passwordEditTextLayout.error = "Password is required"
            }
        }


        binding!!.confirmPasswordEditTextLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.isNotEmpty()) {
                if(text.length < 6){
                    binding!!.confirmPasswordEditTextLayout.error = "Password must be at least 6 characters"
                }else if ( text.toString() != binding!!.passwordEditText.text.toString()){
                    binding!!.confirmPasswordEditTextLayout.error = "Password does not match"
                }else{
                    if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                        binding!!.signUpBtn.isEnabled = true
                    }
                    binding!!.confirmPasswordEditTextLayout.error = null
                }
            }else{
                binding!!.confirmPasswordEditTextLayout.error = "Password is required"
            }
        }

        binding!!.nicEditTextLayout.editText!!.doOnTextChanged{ text, start, before, count ->
            if(text!!.isNotEmpty()) {


                if(text.length < 10){
                    binding!!.nicEditTextLayout.error = "NIC must be at least 10 characters"
                }else{
                    if(binding!!.emailEditTextLayout.error == null && binding!!.passwordEditTextLayout.error == null && binding!!.confirmPasswordEditTextLayout.error == null && binding!!.firstNameTextInputLayout.error == null && binding!!.lastNameTextInputLayout.error == null){
                        binding!!.signUpBtn.isEnabled = true
                    }
                    binding!!.nicEditTextLayout.error = null
                }
            }else{
                binding!!.nicEditTextLayout.error = "NIC is required"
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
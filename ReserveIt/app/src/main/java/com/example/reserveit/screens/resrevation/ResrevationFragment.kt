package com.example.reserveit.screens.resrevation

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.R

class ResrevationFragment : Fragment() {

    companion object {
        fun newInstance() = ResrevationFragment()
    }

    private lateinit var viewModel: ResrevationViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_resrevation, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(ResrevationViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
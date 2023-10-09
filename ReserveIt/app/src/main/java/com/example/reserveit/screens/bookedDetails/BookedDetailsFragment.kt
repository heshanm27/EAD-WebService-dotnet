package com.example.reserveit.screens.bookedDetails

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.R

class BookedDetailsFragment : Fragment() {

    companion object {
        fun newInstance() = BookedDetailsFragment()
    }

    private lateinit var viewModel: BookedDetailsViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_booked_details, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(BookedDetailsViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
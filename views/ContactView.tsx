
import React, { useState } from 'react';

const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fade-in flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-40">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 py-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-[#111418] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">We're here to help</h1>
              <p className="text-[#637588] dark:text-[#9aaebf] text-lg font-normal leading-normal max-w-[500px]">
                Have a question about a piece or an order? Fill out the form below and our curators will get back to you.
              </p>
            </div>

            {!submitted ? (
              <form className="flex flex-col gap-5 w-full max-w-[520px]">
                <div className="flex flex-col gap-2">
                  <label className="text-[#111418] dark:text-gray-200 text-sm font-medium">Full Name</label>
                  <input className="form-input flex w-full rounded-lg text-[#111418] dark:text-white border border-[#dce0e5] dark:border-[#2a3441] bg-white dark:bg-[#111921] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base transition-colors" placeholder="Jane Doe" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#111418] dark:text-gray-200 text-sm font-medium">Email Address</label>
                  <input className="form-input flex w-full rounded-lg text-[#111418] dark:text-white border border-[#dce0e5] dark:border-[#2a3441] bg-white dark:bg-[#111921] focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 text-base transition-colors" placeholder="jane@example.com" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#111418] dark:text-gray-200 text-sm font-medium">Message</label>
                  <textarea className="form-textarea flex w-full rounded-lg text-[#111418] dark:text-white border border-[#dce0e5] dark:border-[#2a3441] bg-white dark:bg-[#111921] focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base resize-none transition-colors" placeholder="Tell us how we can help..." rows={4}></textarea>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSubmitted(true)}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-blue-600 text-white text-base font-bold leading-normal transition-colors"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-6 items-start w-full max-w-[520px] py-10 fade-in">
                <div className="size-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined !text-4xl">check_circle</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#111418] dark:text-white text-2xl font-bold">Message sent</h3>
                  <p className="text-[#637588] dark:text-[#9aaebf] text-base">Thank you. Your message has been received. We usually reply within 24 hours.</p>
                </div>
                <button className="text-primary font-medium hover:underline" onClick={() => setSubmitted(false)}>Send another message</button>
              </div>
            )}

            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-[#f0f2f4] dark:border-[#2a3441] w-full max-w-[520px]">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#f0f2f4] dark:bg-[#1c2633] rounded-lg text-[#111418] dark:text-white">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <div>
                  <h4 className="text-[#111418] dark:text-white font-bold text-sm">Visit the Gallery</h4>
                  <p className="text-[#637588] dark:text-[#9aaebf] text-sm mt-1">123 Art Avenue, Chelsea District<br/>New York, NY 10011</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#f0f2f4] dark:bg-[#1c2633] rounded-lg text-[#111418] dark:text-white">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h4 className="text-[#111418] dark:text-white font-bold text-sm">Opening Hours</h4>
                  <p className="text-[#637588] dark:text-[#9aaebf] text-sm mt-1">Mon - Fri: 10am - 7pm<br/>Sat - Sun: 11am - 5pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full min-h-[400px] lg:min-h-[700px] hidden lg:flex flex-col">
            <div className="sticky top-28 w-full">
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl shadow-sm bg-[#f0f2f4] dark:bg-[#1c2633]">
                <div className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSkv0U8-_RZtwmlgVLKGXCPj1Y8sGZbTKmHpZjP9LA2DwZgu5hPEKC-ym5ZMfmuJDptesCBJF54kaM--Od8h47ocFmbQ0mEvXFgx890641yPb70wfyJrT2pupKF1IOVjaVkFr91oN9MpG6XNitA_O0Wxl6TLYLMbKPwkCY8tDz-aA9hwhvmf7uacF5t1xvIGBSBlcrEsXf5O566F5wdS_NtVdgHqs_3CLWuLEQgJxKlXIW5y4FZ97ZEnuFpgBE54GfEEYMkAH2yxUQ")' }}></div>
              </div>
              <div className="mt-4 flex justify-between items-center px-1">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-primary tracking-wider uppercase">Featured Work</span>
                  <span className="text-sm font-medium text-[#111418] dark:text-white">"Chromatics in Motion"</span>
                </div>
                <span className="text-xs text-[#637588] dark:text-[#9aaebf]">Oil on Canvas, 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;

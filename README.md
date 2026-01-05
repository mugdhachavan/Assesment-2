
# Ecommerce Payment — Technical Assessment

## Overview

A full-stack e-commerce payment flow using React frontend and a .Net backend that calculates discounts dynamically depending on the kind of credit card.

----

## Objectives

    - Business Rules live primarly in the backend, which is treated as the source of truth. (Card Type detection, Discount calculation, Final payable amount).


## 🚀 Key Features

1.Card Type Detection

    Card Type is determined based on the card number prefix using simple,explicit rules:
     - Starts with 4 -> Visa
     - Starts with 5 -> MasterCard
     - Starts with 6 -> RuPay
     - Default -> RuPay

2.Discount Rules :
   
   -Discounts are applied According to card type:
    
     card type              Discount
        Visa                   0%
        MasterCard             5%
        RuPay                  10%

  -The backend recalculates and verifies the discount immediately and shows on UI

3.API Design and Data Flow :

    - Request includes : card number,detected card type, amount
    - Response includes : success status, final amount, final payable amount and confirmed card type


4.Error Handling :
    -Client-side validation for card number,expiry and CVV.
    -Clear messaging for API failures or network issues.
    -Backend validation for invalid inputs.

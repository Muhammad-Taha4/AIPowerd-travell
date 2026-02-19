import stripe
import os
from flask import current_app

class PaymentService:
    def __init__(self):
        stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

    def create_checkout_session(self, package, booking_id, success_url, cancel_url):
        try:
            session = stripe.checkout.session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': package.title,
                            'description': package.description[:100],
                        },
                        'unit_amount': int(package.price * 100), # Cents
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=success_url,
                cancel_url=cancel_url,
                metadata={
                    'booking_id': booking_id
                }
            )
            return session.url
        except Exception as e:
            print(f"Stripe Error: {e}")
            return None

    def verify_webhook(self, payload, sig_header):
        endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
            return event
        except Exception as e:
            print(f"Webhook Error: {e}")
            return None

payment_service = PaymentService()

import os
import sys
import uuid
from datetime import datetime

# Add flask_backend to path so 'app' imports work
sys.path.append(os.path.join(os.getcwd(), 'flask_backend'))

from app import create_app, db
from app.models.user import User, TravellerProfile, AgencyProfile, ph
from app.models.package import TourPackage
from app.models.review import Review
from app.models.booking import Booking

def seed():
    app = create_app()
    with app.app_context():
        # Clear existing data if needed (optional)
        # db.drop_all()
        db.create_all()

        # 1. Create Agency
        agency_id = str(uuid.uuid4())
        agency = User(
            id=agency_id,
            email="agency@aitripadvisor.com",
            password_hash=ph.hash("Agency1234!"),
            role="AGENCY"
        )
        db.session.add(agency)
        
        agency_profile = AgencyProfile(
            user_id=agency_id,
            company_name="Elite Travel Agency",
            description="Leading the way in AI-powered travel experiences.",
            verified=True
        )
        db.session.add(agency_profile)

        # 2. Create Traveller
        traveller_id = str(uuid.uuid4())
        traveller = User(
            id=traveller_id,
            email="test@aitripadvisor.com",
            password_hash=ph.hash("Test1234!"),
            role="TRAVELLER"
        )
        db.session.add(traveller)
        
        traveller_profile = TravellerProfile(
            user_id=traveller_id,
            full_name="Test User",
            preferences=["Adventure", "Luxury", "Cultural"]
        )
        db.session.add(traveller_profile)

        # 3. Create Packages
        packages_data = [
            {
                "title": "Swiss Alps Adventure",
                "description": "7 days of skiing and luxury in the heart of the Alps.",
                "price": 4500.00,
                "duration": 7,
                "tags": ["Mountain", "Adventure", "Skiing"],
                "images": ["https://images.unsplash.com/photo-1531366936337-7c912a4589a7"]
            },
            {
                "title": "Kyoto Zen Experience",
                "description": "Immerse yourself in Japanese culture and serenity.",
                "price": 3200.00,
                "duration": 5,
                "tags": ["Cultural", "Zen", "History"],
                "images": ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"]
            }
        ]

        created_packages = []
        for p_data in packages_data:
            p = TourPackage(
                agency_id=agency_id,
                title=p_data["title"],
                description=p_data["description"],
                price=p_data["price"],
                duration_days=p_data["duration"],
                tags=p_data["tags"],
                images=p_data["images"],
                inclusions={"flights": True, "hotels": True, "meals": False},
                itinerary=[{"day": 1, "activity": "Arrival and welcome dinner"}]
            )
            db.session.add(p)
            created_packages.append(p)
        
        db.session.commit()

        # 4. Create a Booking and Review
        booking = Booking(
            traveller_id=traveller_id,
            package_id=created_packages[0].id,
            total_price=created_packages[0].price,
            status='COMPLETED'
        )
        db.session.add(booking)
        db.session.commit()

        review = Review(
            booking_id=booking.id,
            user_id=traveller_id,
            rating=5,
            comment="Absolutely breathtaking! The AI recommendations were spot on.",
            photos=[]
        )
        db.session.add(review)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed()

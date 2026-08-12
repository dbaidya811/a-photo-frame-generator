<p align="center">
  <img src="public/icon.png" alt="Hacker House Goa ID Card Generator" width="128" />
</p>

# Hacker House Goa 2026 - ID Card Generator

A fun and simple web application for attendees of Hacker House Goa 2026 to generate their personalized builder ID cards.

## 🚀 Description

This project allows users to create a custom ID card by providing their name, role, a builder title, and a profile picture. The generated card can then be downloaded as a high-quality PNG image or shared directly on social media. It's built with Next.js and Tailwind CSS, and it's fully responsive for both desktop and mobile devices.

## ✨ Features

-   **Personalized ID Cards**: Add your name, role, and a unique builder title.
-   **Profile Photo Upload**: Easily upload and preview your profile picture.
-   **Input Validation**: Character limits on text fields and name field accepts only letters.
-   **QR Code Generation**: A unique QR code is generated with your details.
-   **Random ID Number**: Each card gets a unique random ID number.
-   **Responsive Design**: Looks great on any device, from mobile phones to desktops.
-   **Download as PNG**: Save your generated ID card as a high-quality PNG image.
-   **Share on X (Twitter)**: Uses the Web Share API to share your card directly to X or other apps.
-   **Fun Animations**: A confetti animation plays when you generate your card.

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dbaidya811/a-photo-frame-generator.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd a-photo-frame-generator
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 How to Use

1.  Fill in the form fields: **Name**, **Stack / Role**, and **Builder Title**.
2.  Click on the profile photo area to upload an image from your device.
3.  Click the **"Generate ID Card"** button.
4.  Your personalized ID card will be displayed.
5.  Click **"Download"** to save the card as a PNG file or **"Share on X"** to share it.

## 🏗️ Built With

-   [Next.js](https://nextjs.org/) - The React Framework for Production.
-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
-   [html-to-image](https://github.com/bubkoo/html-to-image) - A library to generate an image from a DOM node.
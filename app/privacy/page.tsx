import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Easy Baby Tracker',
  description: 'Privacy policy for Easy Baby Tracker mobile app',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl p-6 md:p-8">
      <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
        Privacy Policy for Easy Baby Tracker
      </h1>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Last updated: November 29, 2025
      </p>

      <div className="space-y-8">
        <section>
          <p className="text-base">
            Easy Baby Tracker ("we", "our", or "us") operates the Easy Baby
            Tracker mobile application (the "Service"). This Privacy Policy
            informs you about our policies regarding the collection, use, and
            disclosure of personal data when you use our Service.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Information Collection and Use
          </h2>
          <p className="mb-4">
            Easy Baby Tracker is designed with your privacy in mind. All data
            collected by the app is stored locally on your device. We do not
            collect, transmit, or store any personal information on external
            servers.
          </p>
          <h3 className="mb-3 text-xl font-semibold">Data Stored Locally</h3>
          <p className="mb-2">
            The app stores the following types of data on your device:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Baby profile information (name, date of birth, photo)</li>
            <li>Feeding records (type, time, duration, amount)</li>
            <li>Sleep tracking data (start time, end time, duration)</li>
            <li>Diaper change logs (time, type)</li>
            <li>Growth measurements (weight, height, head circumference)</li>
            <li>
              Health records (temperature, medications, symptoms, doctor visits)
            </li>
            <li>Pumping logs (time, amount, breast side)</li>
            <li>Diary entries and notes</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Camera and Photo Library Access
          </h2>
          <p>
            The app may request access to your device's camera and photo library
            to allow you to:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Take photos of your baby for their profile</li>
            <li>Select existing photos from your photo library</li>
          </ul>
          <p className="mt-4">
            All photos are stored locally on your device and are never uploaded
            to external servers. You can deny these permissions and still use
            all other features of the app.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Notifications</h2>
          <p>
            The app may send local notifications to remind you about feeding
            schedules or other baby care activities. These notifications are
            generated locally on your device and do not involve any external
            services.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
          <p>
            Since all data is stored locally on your device, the security of
            your data depends on your device's security measures. We recommend:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Keeping your device password-protected</li>
            <li>Using device encryption features</li>
            <li>Regularly backing up your device</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
          <p>
            Easy Baby Tracker does not use any third-party analytics,
            advertising, or tracking services. The app functions entirely
            offline and does not require an internet connection.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Children's Privacy</h2>
          <p>
            Our Service is designed for tracking baby care information. We do
            not knowingly collect any personal information from children. All
            data entered into the app is controlled by the parent or guardian
            and stored locally on their device.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Data Deletion</h2>
          <p>
            You can delete any data stored by the app at any time through the
            app's interface. Uninstalling the app will permanently delete all
            locally stored data from your device.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">
            Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by updating the "Last updated" date at the top of
            this Privacy Policy. You are advised to review this Privacy Policy
            periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>By email: hth321@gmail.com</li>
            <li>By visiting our website: https://easybabytracker.com</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

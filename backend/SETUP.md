# Bookings inbox — setup (~4 minutes, one time)

Bookings from the website land in a Google Sheet you own, and appear in the admin portal.

1. Go to **sheets.new** → name it `P4 Bookings`.
2. **Extensions → Apps Script**. Delete what's there, paste all of `Code.gs`.
3. Change `SECRET` at the top to your own private word.
4. **Deploy → New deployment → (gear) Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required; the website posts anonymously
   - **Deploy** → authorise.
5. Copy the **Web app URL** (ends `/exec`).
6. Admin portal → **Settings → Bookings inbox**: paste the URL and the same secret →
   **Test connection** → **Save settings**.

Bookings then appear under **Bookings & Jobs → Bookings from the website**.
Apps Script also emails you a copy of every booking.

**After editing Code.gs:** Deploy → Manage deployments → pencil → Version: *New version* → Deploy.
The URL stays the same.

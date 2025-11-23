# Deployment Instructions for Namecheap Hosting

## Files Prepared
Your website has been built and exported as static HTML files, ready for deployment to Namecheap's public_html folder.

## Deployment Package
- **File**: `neuravox-deployment.zip`
- This contains all the necessary files and folders for your website

## How to Deploy to Namecheap

### Method 1: Using cPanel File Manager (Recommended)

1. **Login to your Namecheap cPanel**
   - Go to your Namecheap account → Hosting → Manage → cPanel

2. **Navigate to File Manager**
   - Open the File Manager from cPanel
   - Navigate to the `public_html` folder

3. **Clear existing files (if needed)**
   - If you have existing website files, you may want to:
     - Create a backup folder (e.g., `public_html_backup_DATE`)
     - Move existing files to the backup folder
   - OR delete existing files if you don't need them

4. **Upload the deployment package**
   - Click "Upload" in File Manager
   - Select the `neuravox-deployment.zip` file
   - Wait for upload to complete

5. **Extract the files**
   - Right-click on `neuravox-deployment.zip`
   - Select "Extract"
   - Extract to `/public_html/`
   - Delete the zip file after extraction

### Method 2: Using FTP Client

1. **Connect via FTP**
   - Use an FTP client like FileZilla
   - Host: Your domain or FTP server address
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (or as specified by Namecheap)

2. **Navigate to public_html**
   - Open the `public_html` directory

3. **Upload files**
   - Extract `neuravox-deployment.zip` on your local machine first
   - Upload all contents from the extracted folder to `public_html`
   - Ensure all files and folders are uploaded:
     - All `.html` files
     - `_next` folder (contains CSS, JS, and assets)
     - All image files (.jpeg, .png, .webp, .svg)

## Important Files Structure

Your public_html should contain:
```
public_html/
├── index.html (homepage)
├── about.html
├── contact.html
├── journal.html
├── our-work.html
├── partners.html
├── policy-lab.html
├── team.html
├── 404.html
├── _next/ (folder with CSS, JS, and fonts)
│   ├── static/
│   │   ├── chunks/
│   │   ├── css/
│   │   └── media/
├── *.jpeg (image files)
├── *.png (image files)
├── *.webp (image files)
└── *.svg (image files)
```

## Verification

After deployment:
1. Visit your website URL
2. Check that all pages load correctly:
   - Homepage
   - About
   - Our Work
   - Journal
   - Policy Lab
   - Partners
   - Team
   - Contact
3. Verify that styles are applied (site should have proper colors and layout)
4. Check that all images load properly

## Troubleshooting

If the site doesn't display correctly:

1. **Check file permissions**
   - Files should be 644
   - Directories should be 755

2. **Clear browser cache**
   - Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

3. **Check .htaccess**
   - If you have a custom .htaccess file, ensure it's not blocking resources

4. **Verify all files uploaded**
   - Especially check that the `_next` folder and its contents are present

## Additional Notes

- The site is fully static and doesn't require any database
- Contact form uses Formspree (already configured)
- All internal links use relative paths and should work automatically
- The site is responsive and will work on all devices

## Support

If you encounter any issues:
1. Check that all files from the zip are properly extracted
2. Verify your domain is pointing to the correct directory
3. Contact Namecheap support if hosting-specific issues arise
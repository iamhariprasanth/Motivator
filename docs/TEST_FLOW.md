# My Brain doctor - Testing Guide

## 🧪 Complete User Flow Test

Follow these steps to test the entire My Brain doctor application:

---

## ✅ Step 1: Verify Server is Running

Open your browser and check:
- Server Status: http://localhost:3000
- Should see: Landing page with "My Brain doctor" hero

---

## ✅ Step 2: Test Landing Page

**URL:** http://localhost:3000

**Check:**
- [ ] Page loads with gradient background (blue to purple)
- [ ] "My Brain doctor" title displayed
- [ ] Tagline: "Your struggle is your story. Your story is your strength."
- [ ] Three buttons visible: "Try Demo Now", "Get Started Free", "Login"
- [ ] Three feature cards showing: 🎬 Movie-Powered Wisdom, 🧠 ULTRA DEEP MODE, ✨ Actionable Steps

---

## ✅ Step 3: Test AI Demo Page

**URL:** http://localhost:3000/demo

**Check:**
- [ ] Page loads with light gradient background
- [ ] Title: "My Brain doctor - AI Demo"
- [ ] Textarea for user input
- [ ] Three example situations displayed
- [ ] "Get Motivated" button present

**Test Actions:**
1. Click on first example situation
2. Verify it fills the textarea
3. Click "Get Motivated" button
4. Wait 3-8 seconds for AI response
5. Verify response displays with all sections:
   - [ ] 💬 Quote with attribution
   - [ ] 🎬 Movie Scene description
   - [ ] 💡 Deep Meaning explanation
   - [ ] ✨ Actionable Path with steps
   - [ ] 🌟 Affirmation
6. Check sentiment badge (should say "despair" for first example)
7. Check validation score (should be around 7-10)

---

## ✅ Step 4: Test Sentiment Detection

**URL:** http://localhost:3000/api/test-ai

**Expected Response:**
```json
{
  "message": "AI Sentiment Detection Test",
  "results": [
    {"situation": "...", "detected": "despair", "expected": "despair", "match": true},
    {"situation": "...", "detected": "anxiety", "expected": "anxiety", "match": true},
    {"situation": "...", "detected": "determination", "expected": "determination", "match": true}
  ],
  "allPassed": true
}
```

**Check:**
- [ ] All three tests show `"match": true`
- [ ] `"allPassed": true`

---

## ✅ Step 5: Test Dashboard

**URL:** http://localhost:3000/dashboard

**Check:**
- [ ] Header with navigation (Dashboard, History, Demo, Home)
- [ ] Title: "Welcome to Your Motivational Dashboard"
- [ ] Three stat cards: Sessions Today (0), Movie Scenes Used (50+), ULTRA DEEP MODE (Active)
- [ ] Left column: Motivation form with tips
- [ ] Right column: Placeholder message

**Test Actions:**
1. Enter a situation in the textarea (e.g., "I'm worried about my exam tomorrow")
2. Verify character counter updates
3. Click "Get Motivated"
4. Verify loading spinner appears
5. Wait for AI response
6. Verify response displays in right column
7. Check "Recent Sessions" section appears at bottom
8. Verify session card shows in recent sessions

---

## ✅ Step 6: Test Multiple Sessions

**Test Actions:**
1. Submit 3-4 different situations with different emotions:
   - Career rejection (despair)
   - Presentation anxiety (anxiety)
   - Startup success (hope/determination)
   - Relationship issue (sadness)

2. After each submission:
   - [ ] Response displays correctly
   - [ ] Session count increases
   - [ ] Recent sessions updates
   - [ ] Each has correct sentiment badge

---

## ✅ Step 7: Test History Page

**URL:** http://localhost:3000/history

**Check:**
- [ ] Header navigation present
- [ ] Title: "Your Journey"
- [ ] Four stat cards showing:
  - Total Sessions count
  - Most Common Emotion
  - Avg Quality Score
  - Movie Scenes count
- [ ] Filter buttons for all emotion types
- [ ] Sessions list on left
- [ ] Detail view on right (with placeholder message)

**Test Actions:**
1. Click on a session in the list
2. Verify full response displays on the right
3. Verify selected session is highlighted
4. Click on different emotion filter buttons
5. Verify sessions filter correctly
6. Click "all" to show all sessions again

---

## ✅ Step 8: Test Navigation Flow

**Test Actions:**
1. From Dashboard, click "History" in header
2. Verify navigation works
3. From History, click "Demo"
4. Verify navigation works
5. From Demo, click "Home"
6. Verify returns to landing page
7. From Landing, click "Try Demo Now"
8. Verify goes to demo page

---

## ✅ Step 9: Test Responsive Design

**Test Actions:**
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
3. Test different screen sizes:
   - [ ] Mobile (375px) - Single column layout
   - [ ] Tablet (768px) - Two column layout
   - [ ] Desktop (1440px) - Full layout
4. Verify all pages are responsive
5. Verify buttons don't overflow
6. Verify text is readable

---

## ✅ Step 10: Test Error Handling

**Test Actions:**

1. **Test minimum character requirement:**
   - Enter less than 10 characters
   - Verify "Get Motivated" button is disabled
   - Verify character counter shows warning

2. **Test API error (if OpenAI key is invalid):**
   - Temporarily use wrong API key in .env
   - Submit a situation
   - Verify error message displays
   - Restore correct API key

3. **Test empty form:**
   - Leave textarea empty
   - Verify HTML5 validation prevents submission

---

## ✅ Step 11: Test LocalStorage Persistence

**Test Actions:**
1. Submit 2-3 sessions in Dashboard
2. Go to History page and verify they appear
3. Close browser completely
4. Reopen browser to http://localhost:3000/history
5. Verify sessions are still there (persisted)
6. Open DevTools → Application → Local Storage → localhost:3000
7. Verify `motivationSessions` key exists with data

---

## ✅ Step 12: Test AI Response Quality

**Manual Review Checklist:**

For each AI response, verify:
- [ ] Quote is relevant and inspiring
- [ ] Movie scene directly relates to user's situation
- [ ] Deep meaning makes clear connection
- [ ] Actionable path has 2-3 concrete steps
- [ ] Affirmation is personalized and powerful
- [ ] Total word count is close to 100 words
- [ ] All emojis are present (💬 🎬 💡 ✨🌟)
- [ ] Sentiment detection is accurate

---

## 🎯 Success Criteria

### All Tests Pass If:
✅ Landing page loads correctly
✅ Demo page generates AI responses
✅ Sentiment detection test passes (allPassed: true)
✅ Dashboard accepts input and displays responses
✅ Multiple sessions can be created
✅ History page shows all sessions
✅ Filter works correctly
✅ Navigation between pages works
✅ Responsive design works on all screen sizes
✅ Error handling prevents crashes
✅ LocalStorage persists data
✅ AI responses are high quality (7+ validation score)

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to generate motivation"
**Solution:** Check `.env` file has valid `OPENAI_API_KEY`

### Issue: Sessions not appearing in History
**Solution:** Check browser console for LocalStorage errors. Clear LocalStorage and try again.

### Issue: Page not loading
**Solution:** Verify dev server is running (`npm run dev`). Check port 3000 is not in use.

### Issue: Database connection error
**Solution:** Verify PostgreSQL container is running (`docker ps`). Check `DATABASE_URL` in `.env`

### Issue: Styling looks broken
**Solution:** Ensure Tailwind CSS is properly configured. Restart dev server.

---

## 📊 Expected Metrics

After successful testing:
- **Response Time:** 3-8 seconds per AI generation
- **Validation Score:** 7-10 range
- **Sentiment Accuracy:** 100% on test cases
- **Page Load:** < 1 second
- **Mobile Performance:** Smooth on all devices

---

## 🚀 Next Steps After Testing

Once all tests pass:
1. Add user authentication (NextAuth.js)
2. Connect dashboard to PostgreSQL database
3. Seed 50 movie scenes
4. Deploy to production
5. Add analytics
6. Implement premium features

---

**Testing Date:** _______________
**Tester:** _______________
**All Tests Passed:** ☐ Yes ☐ No
**Notes:** _______________

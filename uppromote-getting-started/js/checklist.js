/* ============================================
   UpPromote Getting Started Checklist — Logic
   ============================================ */

/* ── CSV Download ── */
function downloadCSV(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  window.location.href = 'assets/UpPromote_Import_affiliates.csv';
}

/* ── Doc Links ── */
function openDoc(url, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  window.open(url, '_blank', 'noopener');
}

/* ── Step Data ──
   Edit titles, descriptions, and doc links here.
   Each step can have:
     - phase / phaseTime: section header (only on first step of a section)
     - title: step name
     - desc: short description
     - links: array of { label, href } — or { label, href, download: true } for file downloads
     - highlight: true to give the card a colored border
*/
var steps = [
  {
    phase: 'Before you switch', phaseTime: 'Week 1',
    title: 'Clean and reformat your affiliate list',
    desc: 'Match your data to UpPromote\u2019s CSV template. At minimum: name, email, and commission rate. Remove duplicates and fix formatting issues before import.',
    links: [{ label: 'Download CSV template', href: '#', download: true }]
  },
  {
    phase: 'Visualize your program', phaseTime: 'Week 1',
    title: 'Create your first program and set a commission',
    desc: 'A program is how you manage a group of affiliates \u2014 each one can have a different commission rate. Start simple: one program, one flat rate. You can add more later.',
    links: [
      { label: 'Creating a program', href: 'https://docs.uppromote.com/management/programs/program-settings' },
      { label: 'Advanced commissions', href: 'https://docs.uppromote.com/management/programs/program-settings' }
    ]
  },
  {
    title: 'Import your affiliates',
    desc: 'Upload your CSV file and assign affiliates to the program you just created. UpPromote previews everything before confirming \u2014 check that names and rates look right.',
    links: [{ label: 'Importing affiliates', href: 'https://docs.uppromote.com/management/affiliates/add-affiliates' }]
  },
  {
    phase: 'Watch the system work', phaseTime: 'Week 1',
    title: 'Place a test order',
    desc: 'Use an affiliate link or coupon code to place an order. This is the moment you see what your spreadsheet never could \u2014 a sale tracked and attributed automatically.',
    links: [{ label: 'Testing your tracking system', href: 'https://docs.uppromote.com/getting-started/test-tracking' }],
    highlight: true
  },
  {
    title: 'Explore the dashboard \u2014 all in one place',
    desc: 'Watch your test referral appear with the commission already calculated. Clicks, orders, revenue, commissions \u2014 all updating in real time. No more cross-referencing tabs.',
    links: [{ label: 'Referrals and commission calculation', href: 'https://docs.uppromote.com/management/referrals' }]
  },
  {
    phase: 'Do things you couldn\u2019t before', phaseTime: 'Week 2',
    title: 'Set up commission auto-approval',
    desc: 'Define a rule like \u201capprove after 14 days if no refund.\u201d This replaces end-of-month manual reconciliation entirely.',
    links: [{ label: 'Commission auto-approval', href: 'https://docs.uppromote.com/management/referrals/auto-approve' }]
  },
  {
    title: 'Protect your program from fraud',
    desc: 'Detect suspicious referral sources and block bad actors automatically. Run things with confidence, not constant manual spot-checking.',
    links: [{ label: 'Fraud detection', href: 'https://docs.uppromote.com/management/fraud-protection' }]
  },
  {
    title: 'Set up payment methods',
    desc: 'Connect PayPal, Wise, or configure manual payouts. UpPromote calculates what\u2019s owed \u2014 you just review the total and approve.',
    links: [{ label: 'Auto payment setup', href: 'https://docs.uppromote.com/management/payments' }]
  },
  {
    phase: 'Go live', phaseTime: 'Week 3',
    title: 'Invite your existing affiliates',
    desc: 'Send an email to onboard affiliates to their new workspace. They\u2019ll get their own dashboard, tracking links, and real-time performance data.',
    links: [{ label: 'Sending bulk emails', href: 'https://docs.uppromote.com/management/affiliates/email' }],
    highlight: true
  },
  {
    title: 'Review your first performance report',
    desc: 'See which affiliates drive revenue, who needs a nudge, and where to invest next. Data you used to build by hand \u2014 now it\u2019s just there.',
    links: [{ label: 'Analytics and reporting', href: 'https://docs.uppromote.com/management/analytics' }]
  }
];

/* ── State ── */
var state = steps.map(function() { return false; });
var CHK = '<svg class="check-icon" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ── Render ── */
function render() {
  var list = document.getElementById('steps-list');
  var lastPhase = null, html = '';

  steps.forEach(function(s, i) {
    if (s.phase && s.phase !== lastPhase) {
      html += '<div class="phase-label">' + s.phase;
      if (s.phaseTime) html += '<span class="phase-time">' + s.phaseTime + '</span>';
      html += '</div>';
      lastPhase = s.phase;
    }
    var done = state[i];
    var lhtml = '';
    if (s.links && s.links.length) {
      lhtml = '<div class="step-links">';
      s.links.forEach(function(l, li) {
        if (li > 0) lhtml += '<span class="step-sep">\u00b7</span>';
        if (l.download) {
          lhtml += '<a class="step-link" href="#" onclick="downloadCSV(event)">' + l.label + '</a>';
        } else {
          lhtml += '<a class="step-link" href="' + l.href + '" onclick="openDoc(\'' + l.href + '\',event)">' + l.label + '</a>';
        }
      });
      lhtml += '</div>';
    }
    html += '<div class="step-card' + (done ? ' done' : '') + (s.highlight && !done ? ' highlight' : '') + '" onclick="toggle(' + i + ')" style="animation-delay:' + (i * 30) + 'ms">'
      + '<div class="checkbox">' + CHK + '</div>'
      + '<div class="step-body">'
      + '<div class="step-title">' + s.title + '</div>'
      + '<div class="step-desc">' + s.desc + '</div>'
      + lhtml
      + '</div></div>';
  });

  list.innerHTML = html;
  updateProgress();
}

/* ── Progress ── */
function updateProgress() {
  var done = state.filter(Boolean).length, total = steps.length;
  var pct = Math.round((done / total) * 100);
  document.getElementById('prog-label').textContent = done + ' of ' + total + ' steps complete';
  document.getElementById('prog-pct').textContent = pct + '%';
  document.getElementById('prog-fill').style.width = pct + '%';
  var sc = document.getElementById('success-card');
  if (done === total) { sc.classList.add('visible'); sc.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  else sc.classList.remove('visible');
}

/* ── Interactions ── */
function toggle(i) { state[i] = !state[i]; render(); }

/* ── Init ── */
document.addEventListener('DOMContentLoaded', render);

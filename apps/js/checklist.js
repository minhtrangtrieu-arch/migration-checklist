/* ============================================
   UpPromote Migration Checklist
   ============================================
   Edit step content below: titles, descriptions, doc links.
   Rendering logic is at the bottom — no need to touch it.
   ============================================ */

var steps = [
  // ── Before you switch (prep) ──
  {
    phase: 'Before you switch', phaseTime: 'Week 1',
    title: 'Export affiliate list from your current platform',
    desc: 'Go to your current app\u2019s affiliate section and export by CSV file. You\u2019ll need at least: name, email, and commission rate.',
    links: [{ label: 'Choose current platform \u2192 Open related docs', href: '#' }]
  },
  {
    title: 'Clean and reformat your affiliate list',
    desc: 'Match your exported file to UpPromote\u2019s database format. Remove duplicates, fix formatting, and ensure required fields are filled.',
    links: [{ label: 'View sample CSV file', href: '#' }]
  },

  // ── Get your program running (core) ──
  {
    phase: 'Get your program running', phaseTime: 'Week 1',
    title: 'Create program and set commission rules',
    desc: 'A program is how you manage different affiliate groups. Create and define the commission rate for each one.',
    links: [
      { label: 'Creating a program', href: 'https://docs.uppromote.com/management/programs/program-settings' },
      { label: 'Advanced commissions', href: 'https://docs.uppromote.com/management/programs/program-settings' }
    ]
  },
  {
    title: 'Import affiliates',
    desc: 'Upload CSV file and assign program to affiliates. UpPromote previews before confirming \u2014 check that names and rates look right.',
    links: [
      { label: 'Importing affiliates', href: 'https://docs.uppromote.com/management/affiliates/add-affiliates' },
      { label: 'High volume, complex data? Contact support', href: '#' }
    ]
  },
  {
    title: 'Place test order to verify tracking',
    desc: 'Use an affiliate link or coupon to place an order, then check if it shows in the dashboard. This confirms everything is connected.',
    links: [{ label: 'Testing your tracking system', href: 'https://docs.uppromote.com/getting-started/test-tracking' }],
    highlight: true
  },

  // ── Match current experience ──
  {
    phase: 'Match current experience', phaseTime: 'Week 2',
    title: 'Customize affiliate portal',
    desc: 'Add your logo, introduction, guidance and more. Make it feel like home for affiliates.',
    links: [
      { label: 'Customizing affiliate account', href: '#' },
      { label: 'Adding a guide page', href: '#' }
    ]
  },
  {
    title: 'Configure payout method and schedule',
    desc: 'Connect PayPal, Wise or set up manual payouts. Match whatever frequency your affiliates are used to.',
    links: [
      { label: 'Setting up PayPal', href: '#' },
      { label: 'Wise bank transfer', href: '#' },
      { label: 'Other methods', href: '#' }
    ]
  },
  {
    title: 'Set up affiliate emails',
    desc: 'UpPromote has ready-made templates for welcome, payout and performance emails. Just add your brand name and tone.',
    links: [{ label: 'Default email flows', href: '#' }]
  },

  // ── Optimize current workflow ──
  {
    phase: 'Optimize current workflow', phaseTime: 'Week 2',
    title: 'Automate the core action loops',
    desc: 'Start with auto-approve for new affiliates, accept order referrals then send payment. Replace manual reconciliation entirely.',
    links: [
      { label: 'Auto approval', href: 'https://docs.uppromote.com/management/referrals/auto-approve' },
      { label: 'Auto payment', href: 'https://docs.uppromote.com/management/payments' }
    ]
  },
  {
    title: 'Protect your program from fraud',
    desc: 'Detect suspicious referral sources. Run campaigns with confidence, day and night.',
    links: [{ label: 'Fraud detection', href: 'https://docs.uppromote.com/management/fraud-protection' }]
  },

  // ── Go live ──
  {
    phase: 'Go live', phaseTime: '',
    title: 'Transition your affiliates',
    desc: 'Send an email to invite and onboard affiliates to their new workspace. They\u2019ll get their own dashboard, tracking links, and real-time data.',
    links: [
      { label: 'View email templates', href: '#' },
      { label: 'Sending bulk emails', href: 'https://docs.uppromote.com/management/affiliates/email' }
    ],
    highlight: true
  }
];


/* ============================================
   Render Engine — no need to edit below
   ============================================ */

var state = steps.map(function() { return false; });
var CHK = '<svg class="check-icon" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function openDoc(url, e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  window.open(url, '_blank', 'noopener');
}

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
        lhtml += '<a class="step-link" href="' + l.href + '" onclick="openDoc(\'' + l.href + '\',event)">' + l.label + '</a>';
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

function toggle(i) { state[i] = !state[i]; render(); }

document.addEventListener('DOMContentLoaded', render);

import React from 'react'

function Footer() {
  return (
    <>
      <footer className="footer">
      <div className="footer__top">
        <span className="footer__brand">Acme Corp</span>

        <ul className="footer__links">
          <li><a href="/about">About</a></li>
          <li><a href="/status">Status</a></li>
          <li><a href="/team">Team</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Suntouch. All rights reserved.</span>
        <span className="footer__meta">
          Built with care, not noise.
        </span>
      </div>
    </footer>
    </>
  )
}

export default Footer

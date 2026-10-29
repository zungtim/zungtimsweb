import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Mail, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactDialog } from './ContactDialog';
import { profile, researchInterests } from '../content/profile';
import { travelEntries } from '../content/travel';
import { getMediaEntry, resolveMediaImage } from '../content/media';

export const Hero: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const latestTrip = travelEntries[0];
  const travelCover = latestTrip
    ? resolveMediaImage(getMediaEntry(latestTrip.media)?.cover, 'lg')
    : undefined;

  return (
    <>
      <section id="about" className="home-intro page-gutter">
        <div className="ui-shell">
          <p className="eyebrow profile-eyebrow"><Microscope size={14} /> Personal profile</p>
          <div className="identity-row">
            <div className="identity-copy">
              <p className="identity-chinese">{profile.chineseName}</p>
              <h1 className="name-heading">{profile.name}</h1>
              <p className="profile-summary">{profile.bio}</p>
              <div className="profile-actions">
                <Link to="/research" className="ui-focus-ring ui-primary-btn action-button">
                  <Microscope size={16} /> Research <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isContactOpen}
                  className="ui-focus-ring ui-ghost-btn action-button"
                >
                  <Mail size={16} /> 联系我
                </button>
              </div>
            </div>
            <figure className="profile-portrait">
              <img src={profile.avatar} alt={profile.name} width="144" height="180" fetchPriority="high" />
            </figure>
          </div>
        </div>
      </section>

      <section className="home-interests page-gutter" aria-labelledby="home-interests-title">
        <div className="ui-shell editorial-grid">
          <div className="section-label">
            <p className="eyebrow">01 / Research</p>
            <h2 id="home-interests-title">研究兴趣</h2>
            <Link to="/research" className="ui-focus-ring text-link">全部方向 <ArrowUpRight size={16} /></Link>
          </div>
          <div className="interest-index">
            {researchInterests.map((interest) => (
              <div key={interest.id} className="interest-row">
                <span className="index-number">{interest.id}</span>
                <div><h3>{interest.title}</h3><p>{interest.english}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-background page-gutter" aria-labelledby="home-background-title">
        <div className="ui-shell editorial-grid">
          <div className="section-label">
            <p className="eyebrow">02 / Background</p>
            <h2 id="home-background-title">教育与经历</h2>
          </div>
          <div className="background-teaser">
            <div>
              <p className="muted text-sm mb-3">本科背景</p>
              <h3 className="text-lg font-medium mb-2">广东工业大学 · 化学工程与工艺</h3>
              <p className="muted text-sm leading-7">教育记录 / 本科科研训练 / 代表性荣誉</p>
            </div>
            <Link to="/background" className="ui-focus-ring text-link">Background <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      {latestTrip && travelCover && (
        <section className="home-travel page-gutter" aria-labelledby="home-travel-title">
          <div className="ui-shell">
            <div className="section-line">
              <div><p className="eyebrow mb-2">03 / Travel</p><h2 id="home-travel-title">旅行记录</h2></div>
              <Link to="/travel" className="ui-focus-ring text-link">全部旅行 <ArrowUpRight size={16} /></Link>
            </div>
            <Link to={`/travel?trip=${encodeURIComponent(latestTrip.id)}`} className="ui-focus-ring travel-feature">
              <img
                src={travelCover.src}
                srcSet={travelCover.srcSet}
                sizes="(max-width: 1100px) 100vw, 1100px"
                alt={latestTrip.location}
                loading="lazy"
              />
              <div className="travel-feature-caption">
                <span className="text-sm">{latestTrip.location} / {latestTrip.date}</span>
                <h3>{latestTrip.title}</h3><ArrowUpRight size={24} />
              </div>
            </Link>
          </div>
        </section>
      )}
      <ContactDialog open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

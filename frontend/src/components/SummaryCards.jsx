import React from 'react';

function SummaryCards({ sessions }) {
  const total = sessions.length;
  const paid = sessions.filter((s) => s.paid === true).length;
  const unpaid = sessions.filter((s) => s.paid === false).length;
  const totalFees = sessions.reduce((sum, s) => sum + (s.fee || 0), 0);

  const cards = [
    {
      label: 'Total Sessions',
      value: total,
      icon: '🅿️',
      color: 'card-blue',
      suffix: '',
    },
    {
      label: 'Paid Sessions',
      value: paid,
      icon: '✅',
      color: 'card-green',
      suffix: '',
    },
    {
      label: 'Unpaid Sessions',
      value: unpaid,
      icon: '⏳',
      color: 'card-orange',
      suffix: '',
    },
    {
      label: 'Total Fees',
      value: totalFees.toFixed(2),
      icon: '💰',
      color: 'card-purple',
      suffix: '₹',
      prefix: true,
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map((card) => (
        <div className="col-6 col-xl-3" key={card.label}>
          <div className={`summary-card ${card.color}`}>
            <div className="summary-icon">{card.icon}</div>
            <div className="summary-value">
              {card.prefix ? `${card.suffix}${card.value}` : `${card.value}${card.suffix}`}
            </div>
            <div className="summary-label">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;

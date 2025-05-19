export const navItems = [
    {
      name: 'Analysis',
      type: 'link',
      href: '/analysis',
      dropdown: false
    },
    {
      name: 'Markets',
      type: 'link',
      href: '/markets',
      dropdown: false
    },
    {
      name: 'Docs',
      type: 'link',
      href: '/docs',
      dropdown: false
    },
    {
      name: 'Region',
      type: 'dropdown',
      dropdown: true,
      sections: [
        {
          header: 'Active: North America',
          links: [
            { label: 'Change', href: '#' }
          ]
        }
      ]
    },
    {
      name: 'Tools',
      type: 'dropdown',
      dropdown: true,
      sections: [
        {
          header: 'Portfolio Analysis',
          links: [
            { label: 'Backtest Asset Class Allocation', href: '#' },
            { label: 'Backtest Portfolio', href: '#' },
            { label: 'Manager Performance Analysis', href: '#' }
          ]
        },
        {
          header: 'Portfolio Simulation',
          links: [
            { label: 'Monte Carlo Simulation', href: '#' },
            { label: 'Financial Goals', href: '#' }
          ]
        },
        {
          header: 'Optimization',
          links: [
            { label: 'Efficient Frontier', href: '#' },
            { label: 'Portfolio Optimization', href: '#' },
            { label: 'Black-Litterman Model', href: '#' },
            { label: 'Rolling Optimization', href: '#' }
          ]
        },
        {
          header: 'Asset Analytics',
          links: [
            { label: 'Fund Screener', href: '#' },
            { label: 'Fund Performance', href: '#' },
            { label: 'Asset Correlations', href: '#' }
          ]
        },
        {
          header: 'Factor Analysis',
          links: [
            { label: 'Factor Regression', href: '#' },
            { label: 'Risk Factor Allocation', href: '#' },
            { label: 'Fund and ETF Factor Regressions', href: '#' },
            { label: 'Factor Performance Attribution', href: '#' }
          ]
        },
        {
          header: 'Tactical Allocation',
          links: [
            { label: 'Tactical Allocation Models', href: '#' }
          ]
        },
        {
          header: 'Other',
          links: [
            { label: 'Show All', href: '#' }
          ]
        }
      ]
    },
    {
      name: 'Sign Up',
      type: 'link',
      href: '/signup',
      dropdown: false,
      position: 'right'
    },
    {
      name: 'Log In',
      type: 'link',
      href: '/login',
      dropdown: false,
      position: 'right'
    },
];

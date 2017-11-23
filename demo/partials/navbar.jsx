<div class="navigation">
  { // An example of an iteration via 'map'
    ['index', 'a', 'b'].map((target) => {
      let current = context.getCurrentPage()
      let disabled = (target === current)
      let classNames = ["nav-item",target].join(' ')
      let href = './'+target+'.html'
      // Example for using labels
      let label = context.getLabel('nav:'+target)
      if (disabled) {
        return <span class={classNames+' disabled'} href={href} disabled>{label}</span>
      } else {
        return <a class={classNames} href={href}>{label}</a>
      }
    })
  }
</div>

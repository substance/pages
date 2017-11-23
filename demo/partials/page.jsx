<html>
  <head>
    <title>{props.title || "Substance Pages - Demo"}</title>
    <link href="demo.css" rel='stylesheet' type='text/css' />
  </head>
  <body>
    <Partial src="partials/header" />
    <div class="body">
      {props.children}
    </div>
    <Partial src="partials/footer" />
  </body>
</html>

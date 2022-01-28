const Metalsmith = require('metalsmith')
const markdown = require('@metalsmith/markdown')
const layouts = require('metalsmith-layouts')
const permalinks = require('@metalsmith/permalinks')
const collections = require('metalsmith-collections')
const copyStatic = require('metalsmith-static')

Metalsmith(__dirname)
  .metadata({
    sitename: 'My Static Site & Blog',
    description: "It's about saying »Hello« to the World.",
    generator: 'Metalsmith',
    url: 'https://metalsmith.io/'
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(
    collections({
      posts: 'posts/*.md'
    })
  )
  .use(fromDB)
  .use(markdown())
  .use(permalinks())
  .use(
    layouts({
      engineOptions: {
        helpers: {
          formattedDate: function (date) {
            return new Date(date).toLocaleDateString()
          }
        }
      }
    })
  )
  .use(copyStatic({src:'static', dest: '.'}))
  .build(function (err, files) {
    if (err) throw err
  })


  /** example custom plugin */
  function fromDB(files, metalsmith, done) {
    files['fromdb.md'] = {
      title: 'From DB',
      layout: 'layout.hbs',
      contents: `# From DB\nProgramatically generated`
    }
    done()
  }


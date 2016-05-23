# angular-2-ionic-sandbox

Learning angular 2 with ionic.

Plan:

1. Read in general about angular 2
2. Create simple TODO app:
    1. Todo's list with filtering by group, delete functionality
    2. Add todo component
    3. Todo edit/details page
    3. Routing:
        * /list
        * /details/id
    3. Latest done and latest added components (use different update techniques)
3. Read in general about Ionic
4. Transform todo app to Ionic
5. Read about these topics in detail and try to implement some examples within app:
    * angular 2 sdk related topics
         - Observables (RXJS)
         - DI
            * inject a configuration object into service
            * create a factory and use it (create "test" page if needed)
            * replace injectable service with its subclass
         - Zones
         - Change Detection
         - Unit testing
         - Creating a library
    * other angular 2 topics
    * ionic topics
6. Other:
    * create jsonstub endpoint and make an http request
    * use event emitter to trigger event in component (e.g. timer with event of each 10s)
    * use childView in parent component
    * create an advanced form with custom validators
    * create a pipe
    * create simple animation


Notes:
* Target is to learn angular v2 and ionic, don't spend too much time on setting up systemjs,
learning typescript, etc
* use https://github.com/marcj/angular2-localStorage to save todo's?

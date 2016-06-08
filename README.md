# angular-2-ionic-sandbox

Learning angular 2 with ionic.

Plan:

1. [x] Read in general about angular 2
2. [x] Create simple TODO app:
    1. [x] Todo's list with delete functionality
    2. [x] Add todo component
    3. [x] Todo edit/details page
    3. [x] Routing:
        * /list
        * /details/id
    3. [x] Latest done and latest added components (use different update techniques)
3. [x] Read in general about Ionic
4. [x] Transform todo app to Ionic
5. [ ] Read about these topics in detail and try to implement some examples within app:
    * [ ] angular 2 sdk related topics
         - [x] Observables (RXJS)
         - [ ] ngrx/store
            * [x] refactor app to use store
            * [ ] implement undo feature
            * [ ] implement loaders and notifications for api requests (delay responses)
         - [ ] DI
            * [ ] inject a configuration object into service
            * [ ] create a factory and use it (create "test" page if needed)
            * [ ] replace injectable service with its subclass
         - [x] Zones
         - [ ] Change Detection
         - [ ] Unit testing
            * [ ] test component
            * [ ] test service with mocked dependencies (including angular, e.g. http)
         - [ ] Creating a library
    * [ ] other angular 2 topics
    * [ ] ionic topics
6. [ ] Other:
    * [x] create test api endpoint and make an http request
    * [x] use event emitter to trigger event in component (e.g. timer with event of each 10s)
    * [x] use childView in parent component
    * [ ] advanced forms
        - [x] custom validators
        - [ ] custom form control (format value before setting to model)
        - [ ] implement debounce on model update and validation
    * [ ] create a pipe
    * [ ] create simple animation
    * [ ] create angular2 + ionic project from scratch (configuring all build and run explicitly, without using seed)
    * [ ] add filtering by category in todos list


Notes:
* Target is to learn angular v2 and ionic, don't spend too much time on setting up systemjs,
learning typescript, etc
* use https://github.com/marcj/angular2-localStorage to save todo's?

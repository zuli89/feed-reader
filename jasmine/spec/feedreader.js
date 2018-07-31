/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    // first test suite: RSS feeds definitions
    describe('RSS Feeds', function() {
         //test 1: make sure that the allFeeds variable has been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test2: loop through all feeds and make sure url's are defined and not empty
        it('URLs are defined', function() { 
            for(let feed of allFeeds) { //loops thorugh all feeds
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);  
            }
        });

        //test 3: loop though eahc feed and make sure names are defined and not empty
        it('names are defined', function(){
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    //Second test suite: test sidebar menu's functionality 
    describe('The Menu', function() {
        let body = $('body'); 
        //test 4: ensure menu is hidden by default
        it('menu hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true); //if the body tag has class menu hidden, test will pass
        });

        // test 5: check that menu changes to visbile or not visible when clicked
         it('menu changes visibility when clicked', function() {
             //after the menu icon is clicked once, menu-hidden class should be removed
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            //after the menu icon is clicked again, menu-hidden should be added
            $('.menu-icon-link').trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
         });
    });
    
    //Third test suite: checks feed entries are present
    describe('Initial Entries', function() { 
         // asynchronous function to make sure the load feed function loads and complets work
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        // test 6: see if there is at least a single .entry element within the .feed container.
        it('there is at least a single .entry element within the .feed container', function() {
            //checks to see that an .entry elements in .feed are not empty
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    //Fourth test suite: checks for new feeds being loaded
    describe('New Feed Selection', function() {   
        let firstFeed;
        //test 7: ensures that when new feed is loaded the content changes
        beforeEach(function (done) {
            loadFeed(0, function() { //loads original feed
                firstFeed = $('.feed').html(); //stores the original feed's html 
              
                loadFeed(1, function() { //loads a new feed 
                    done(); //calls function done(), after the new feed has loaded
                });           
            });
        });

        it('new feed is different than previous feed', function() {
            expect(firstFeed).not.toBe($('.feed').html()); //compares previous with new feed by checking innerHtml
        });   
    });

}());

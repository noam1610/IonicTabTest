'use strict';
require('angular-ui-router');
require('angular-ionic');
require('ng-cordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova']);
    // inject:folders start
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.views.transition('ios');
            $ionicConfigProvider.tabs.position('bottom');
<<<<<<< HEAD
=======

>>>>>>> 2d92b62... feat(app): Commit to save the actual code
            $stateProvider
                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    template: require('./views/tabs.html')
                })
                .state('tab.dash', {
                    url: '/dash',
                    views: {
                        'tab-dash': {
                            template: require('./views/tab-dash.html')
                        }
                    }
                })
                .state('tab.friends', {
                    url: '/friends',
                    views: {
                        'tab-friends': {
                            template: require('./views/tab-friends.html')
                        }
                    }
                })
                .state('tabs.cool', {
                    url: '/cool',
                    views: {
                        'tab-friends-part': {
                            template: require('./views/tab-friends-part.html')
                        }
                    }
                })
                .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            template: require('./views/tab-account.html')
                        }
                    }
                });
            $urlRouterProvider.otherwise('tab/account');
        }
<<<<<<< HEAD
    ]); 
=======
    ]);
>>>>>>> 2d92b62... feat(app): Commit to save the actual code

    app.run(function() {
        if (window.ionic) {
            window.ionic.Gestures.gestures.Drag.handler = function dragGesture(ev, inst) {
                if (ev.srcEvent.type == 'touchstart' || ev.srcEvent.type == 'touchend') {
                    this.preventedFirstMove = false;

                } else if (!this.preventedFirstMove && ev.srcEvent.type == 'touchmove') {
                    // Prevent gestures that are not intended for this event handler from firing subsequent times
                    if (inst.options.prevent_default_directions.length > 0 && inst.options.prevent_default_directions.indexOf(ev.direction) != -1) {
                        ev.srcEvent.preventDefault();
                    }
                    this.preventedFirstMove = true;
                }

                // current gesture isnt drag, but dragged is true
                // this means an other gesture is busy. now call dragend
                if (window.ionic.Gestures.detection.current.name != this.name && this.triggered) {
                    inst.trigger(this.name + 'end', ev);
                    this.triggered = false;
                    return;
                }

                // max touches
                if (inst.options.drag_max_touches > 0 &&
                    ev.touches.length > inst.options.drag_max_touches) {
                    return;
                }

                switch (ev.eventType) {
                    case window.ionic.Gestures.EVENT_START:
                        this.triggered = false;
                        break;

                    case window.ionic.Gestures.EVENT_MOVE:
                        // when the distance we moved is too small we skip this gesture
                        // or we can be already in dragging
                        if (ev.distance < inst.options.drag_min_distance &&
                            window.ionic.Gestures.detection.current.name != this.name) {
                            return;
                        }

                        // we are dragging!
                        if (window.ionic.Gestures.detection.current.name != this.name) {
                            window.ionic.Gestures.detection.current.name = this.name;
                            if (inst.options.correct_for_drag_min_distance) {
                                // When a drag is triggered, set the event center to drag_min_distance pixels from the original event center.
                                // Without this correction, the dragged distance would jumpstart at drag_min_distance pixels instead of at 0.
                                // It might be useful to save the original start point somewhere
                                var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
                                window.ionic.Gestures.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                                window.ionic.Gestures.detection.current.startEvent.center.pageY += ev.deltaY * factor;

                                // recalculate event data using new start point
                                ev = window.ionic.Gestures.detection.extendEventData(ev);
                            }
                        }

                        // lock drag to axis?
                        if (window.ionic.Gestures.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance)) {
                            ev.drag_locked_to_axis = true;
                        }
                        var last_direction = window.ionic.Gestures.detection.current.lastEvent.direction;
                        if (ev.drag_locked_to_axis && last_direction !== ev.direction) {
                            // keep direction on the axis that the drag gesture started on
                            if (window.ionic.Gestures.utils.isVertical(last_direction)) {
                                ev.direction = (ev.deltaY < 0) ? window.ionic.Gestures.DIRECTION_UP : window.ionic.Gestures.DIRECTION_DOWN;
                            } else {
                                ev.direction = (ev.deltaX < 0) ? window.ionic.Gestures.DIRECTION_LEFT : window.ionic.Gestures.DIRECTION_RIGHT;
                            }
                        }

                        // first time, trigger dragstart event
                        if (!this.triggered) {
                            inst.trigger(this.name + 'start', ev);
                            this.triggered = true;
                        }

                        // trigger normal event
                        inst.trigger(this.name, ev);

                        // direction event, like dragdown
                        inst.trigger(this.name + ev.direction, ev);

                        // block the browser events
                        if ((inst.options.drag_block_vertical && window.ionic.Gestures.utils.isVertical(ev.direction)) ||
                            (inst.options.drag_block_horizontal && !window.ionic.Gestures.utils.isVertical(ev.direction))) {
                            ev.preventDefault();
                        }
                        break;

                    case window.ionic.Gestures.EVENT_END:
                        // trigger dragend
                        if (this.triggered) {
                            inst.trigger(this.name + 'end', ev);
                        }

                        this.triggered = false;
                        break;
                }
            };
        }
    });
<<<<<<< HEAD

=======
>>>>>>> 2d92b62... feat(app): Commit to save the actual code
    return app;
};

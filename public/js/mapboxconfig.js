mapboxgl.accessToken = //// use API KEY HERE
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/shadesz/ckdxii11i16sy19phd8a7sdp6'

    });
console.log(array_bussines[0])
map.on('load', function() {
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        // Add an image to use as a custom marker
        function(error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);

            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[0].name}</strong><p></p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[0].longitude, array_bussines[0].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[1].name}</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[1].longitude, array_bussines[1].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[2].name}</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[2].longitude, array_bussines[2].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[3].name}</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[3].longitude, array_bussines[3].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[4].name}</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year's Seersucker Social bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[4].longitude, array_bussines[4].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[5].name}</strong><p>The annual Capital Pride Parade makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[5].longitude, array_bussines[5].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[6].name}</strong><p>Jazz-influenced hip hop artist Muhsinah plays the Black Cat (1811 14th Street NW) tonight with Exit Clov and Gods’illa. 9:00 p.m. $12.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[6].longitude, array_bussines[6].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[7].name}</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[7].longitude, array_bussines[7].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${array_bussines[8].name}</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [array_bussines[8].longitude, array_bussines[8].latitude]
                        }
                    }]
                }
            });

            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true
                }
            });
        }
    );
    var marker = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([0, 0])
        .addTo(map);

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('dragend', onDragEnd);
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
    map.addControl(new mapboxgl.NavigationControl());
    map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});
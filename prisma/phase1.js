const phase1= [
    {
      postId: 1,
      userId: 1,
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      title: "Eiffel Tower Adventures",
      description: "Bonjour from Paris! Exploring the city of Lights has been a dream come true. Can't get enough of the art, history, and those delicious pastries! Who else has Paris on their bucket list?",
      user: "Justin Hawks",
      startDate: "2025-05-01T10:00:00Z",
      endDate: "2025-05-07T18:00:00Z",
      rating: 5,
    },
    {
      postId: 2,
      userId: 2,
      imageUrl: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      title: "Tokyo Nights",
      description: "Neon lights, sushi delights, and karaoke nights! Tokyo is a sensory overload in the best way possible. The blend of tradition and technology is mind-blowing.",
      user: "Emily Chen",
      startDate: "2025-06-15T14:00:00Z",
      endDate: "2025-06-22T11:00:00Z",
      rating: 4,
    },
    {
      postId: 3,
      userId: 3,
      imageUrl: "https://images.unsplash.com/photo-1525874684015-58379d421a52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      title: "Big Apple Escapade",
      description: "New York, New York! From Central Park to Broadway, every corner of this city tells a story. The energy here is unmatched. Who's up for a slice of authentic NY pizza?",
      user: "Michael Johnson",
      startDate: "2025-07-10T09:00:00Z",
      endDate: "2025-07-17T20:00:00Z",
      rating: 5,
    },
    {
      postId: 4,
      userId: 4,
      imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVuaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "Venetian Canals",
      description: "Gliding through the canals of Venice feels like stepping into a painting. The architecture, the food, the romance in the air - it's all simply magical!",
      user: "Sophia Martinez",
      startDate: "2025-08-20T11:00:00Z",
      endDate: "2025-08-27T16:00:00Z",
      rating: 5,
    },
    {
      postId: 5,
      userId: 5,
      imageUrl: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      title: "Bali Bliss",
      description: "Found paradise in Bali! From pristine beaches to lush rice terraces, every view is breathtaking. The local culture and hospitality are equally amazing.",
      user: "David Wilson",
      startDate: "2025-09-05T13:00:00Z",
      endDate: "2025-09-15T12:00:00Z",
      rating: 5,
    },
    {
      postId: 6,
      userId: 6,
      imageUrl: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9uZG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "London Calling",
      description: "Big Ben, red phone booths, and afternoon tea - London is everything I imagined and more! The mix of history and modernity is fascinating.",
      user: "Olivia Brown",
      startDate: "2025-10-01T08:00:00Z",
      endDate: "2025-10-08T19:00:00Z",
      rating: 4,
    },
    {
      postId: 7,
      userId: 7,
      imageUrl: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjaHUlMjBwaWNjaHV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      title: "Machu Picchu Trek",
      description: "Standing atop Machu Picchu is a surreal experience. The Inca Trail was challenging but so worth it. The views, the history, the sense of accomplishment - unforgettable!",
      user: "Daniel Lee",
      startDate: "2025-11-10T07:00:00Z",
      endDate: "2025-11-20T18:00:00Z",
      rating: 5,
    },
    {
      postId: 8,
      userId: 8,
      imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "Barcelona Beauties",
      description: "Gaudí's architecture, delicious tapas, and vibrant street life - Barcelona has stolen my heart! La Sagrada Familia left me in awe. Can't wait to come back!",
      user: "Emma Taylor",
      startDate: "2025-12-05T12:00:00Z",
      endDate: "2025-12-12T22:00:00Z",
      rating: 5,
    },
    {
      postId: 9,
      userId: 9,
      imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhW_MDw2ViV0roOtoXxgojBJrDIStcwga7vbgZg051pHqYkB5r3Tz1P-QI9MzgRau5JX-AzW81sAdBHBVa6ToATo7JPHxk9uKKWkTvjBRDknDHsTFSzGmTB6ctxK7btapdwsnrEiSBb9DQ/s1600/PARIS+EIFFEL+TOWER.jpg",
      title: "Parisian Dreams",
      description: "Sipping coffee at a sidewalk café, strolling along the Seine, admiring world-class art - Paris is a dream come true. The city's charm is truly timeless.",
      user: "Alexander White",
      startDate: "2026-01-15T09:00:00Z",
      endDate: "2026-01-22T17:00:00Z",
      rating: 5,
    },
    {
      postId: 10,
      userId: 10,
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlvJTIwZGUlMjBqYW5laXJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "Rio Rhythms",
      description: "The energy in Rio is contagious! From the beaches of Copacabana to the top of Sugarloaf Mountain, every moment has been exhilarating. Samba nights are unforgettable!",
      user: "Isabella Garcia",
      startDate: "2026-02-20T10:00:00Z",
      endDate: "2026-02-28T23:00:00Z",
      rating: 4,
    },
    {
      postId: 11,
      userId: 11,
      imageUrl: "https://images.unsplash.com/photo-1549893072-4bc678117f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a3lvdG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      title: "Kyoto's Tranquility",
      description: "Kyoto's serene temples and gardens are a balm for the soul. The traditional tea ceremony was a highlight. Feeling zen and inspired by the beauty of Japanese culture.",
      user: "Liam Anderson",
      startDate: "2026-03-10T08:00:00Z",
      endDate: "2026-03-18T16:00:00Z",
      rating: 5,
    },
    {
      postId: 12,
      userId: 12,
      imageUrl: "https://www.santorinitravel.com/wp-content/uploads/2021/04/private-sunset-tour-in-Santorini.jpg",
      title: "Santorini Sunsets",
      description: "Watching the sunset in Oia is a bucket list experience! The white-washed buildings against the blue Aegean Sea create a postcard-perfect scene. Greek hospitality is unmatched.",
      user: "Ava Thompson",
      startDate: "2026-04-05T11:00:00Z",
      endDate: "2026-04-12T20:00:00Z",
      rating: 5,
    },
    {
      postId: 13,
      userId: 13,
      imageUrl: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFycmFrZWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "Marrakech Magic",
      description: "Lost in the labyrinth of Marrakech's medina! The colors, scents, and sounds of the souks are intoxicating. Enjoyed a traditional hammam and felt like royalty.",
      user: "Noah Parker",
      startDate: "2026-05-15T09:00:00Z",
      endDate: "2026-05-22T18:00:00Z",
      rating: 4,
    },
    {
      postId: 14,
      userId: 14,
      imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      title: "Sydney Harbour Views",
      description: "G'day from Down Under! Climbing the Sydney Harbour Bridge was exhilarating. The Opera House is even more impressive in person. Bondi Beach is a surfer's paradise!",
      user: "Mia Robinson",
      startDate: "2026-06-20T07:00:00Z",
      endDate: "2026-06-30T22:00:00Z",
      rating: 5,
    },
    {
      postId: 15,
      userId: 15,
      imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWNlbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      title: "Iceland's Natural Wonders",
      description: "Chasing waterfalls, soaking in hot springs, and witnessing the Northern Lights - Iceland is nature at its most spectacular. The landscapes here are otherworldly!",
      user: "Ethan Cooper",
      startDate: "2026-07-10T06:00:00Z",
      endDate: "2026-07-20T23:00:00Z",
      rating: 5,
    },
    {
      postId: 16,
      userId: 16,
      imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      title: "Dubai Dazzle",
      description: "From the top of Burj"
    }
  ];

  export default phase1;
  
-- CreateTable
CREATE TABLE "User" (
    "_id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "usernamme" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "resettoken" TEXT,
    "hashedRt" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Theater" (
    "_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "posterimg" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "theaterId" UUID NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Showtime" (
    "_id" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "theaterId" UUID NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Showtime_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "_id" UUID NOT NULL,
    "theaterId" UUID NOT NULL,
    "seatnumber" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "showtimeId" UUID NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "_id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "showtimeId" UUID NOT NULL,
    "theaterId" UUID NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "seatnumber" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_usernamme_key" ON "User"("usernamme");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/

CREATE OR REPLACE FUNCTION random_string(length integer) returns TEXT as
$$
declare
  chars  TEXT[]  := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result TEXT    := '';
  i      INTEGER := 0;
BEGIN
  IF length < 0 THEN
    RAISE EXCEPTION 'Given length cannot be less than 0';
  END IF;
  FOR i IN 1..length
    LOOP
      result := result || chars[1 + floor(random() * array_length(chars, 1))];
    END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "code" VARCHAR(15) NOT NULL DEFAULT random_string(15);

-- CreateIndex
CREATE UNIQUE INDEX "order_code_key" ON "order"("code");

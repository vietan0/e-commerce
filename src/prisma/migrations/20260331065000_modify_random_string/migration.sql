CREATE OR REPLACE FUNCTION random_string(length integer) returns TEXT as
$$
declare
  chars  TEXT[]  := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z}';
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
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Leaf,
  MapPin,
  RotateCcw,
  SlidersHorizontal,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  dishes,
  favoriteIds,
  filterDishes,
  malls,
  toggleFavorite,
  type Category,
  type Dish,
} from "./model";
function FoodArt({ dish }: { dish: Dish }) {
  const green = dish.category === "plant",
    noodles = dish.category === "noodles";
  return (
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-label={`ภาพวาดเมนูสมมติ ${dish.name}`}
      className="food-art"
    >
      <rect width="600" height="440" fill={dish.color} />
      <path
        d="M0 330L600 100M0 360L600 130"
        stroke="#fff"
        strokeWidth="2"
        opacity=".13"
      />
      <ellipse
        cx="299"
        cy="353"
        rx="188"
        ry="35"
        fill="#433322"
        opacity=".16"
      />
      <circle cx="300" cy="220" r="167" fill="#f4ead6" />
      <circle cx="300" cy="220" r="143" fill="#e3d6bd" />
      <circle
        cx="300"
        cy="220"
        r="130"
        fill={noodles ? "#ac7652" : "#faf0da"}
      />
      {noodles ? (
        <g stroke="#efcf82" fill="none" strokeWidth="8">
          <path d="M207 166q180-22 170 12t-175 25 183 26-172 18 170 22-160 10" />
          <path d="M225 139q-60 130 18 168m17-180q-44 120 4 173m19-162q-50 120 7 162m30-153q-45 130 8 164m22-149q-41 110 12 136" />
        </g>
      ) : (
        <g fill="#e1d2b3">
          {Array.from({ length: 35 }, (_, i) => (
            <ellipse
              key={i}
              cx={205 + ((i * 37) % 185)}
              cy={140 + ((i * 53) % 170)}
              rx="3"
              ry="7"
              transform={`rotate(${i * 20} ${205 + ((i * 37) % 185)} ${140 + ((i * 53) % 170)})`}
            />
          ))}
        </g>
      )}
      <g
        fill={green ? "#bc924b" : "#b7743c"}
        stroke={green ? "#8e713e" : "#8a4e28"}
        strokeWidth="3"
      >
        <path d="M285 145l79-8 32 28-13 54-64 5-44-38z" />
        <path d="M286 230l90-2 19 34-27 40-68-12-24-29z" />
      </g>
      <g stroke="#f3d199" strokeWidth="6">
        <path d="M301 152l64 45m-55-56l65 44m-77-16l48 35m-42 39l62 34m-66-20l46 27" />
      </g>
      <g fill="#68854b">
        <ellipse
          cx="218"
          cy="185"
          rx="25"
          ry="38"
          transform="rotate(-40 218 185)"
        />
        <ellipse
          cx="212"
          cy="250"
          rx="24"
          ry="36"
          transform="rotate(30 212 250)"
        />
        <ellipse
          cx="252"
          cy="296"
          rx="24"
          ry="34"
          transform="rotate(-55 252 296)"
        />
      </g>
      <g fill="#df7955">
        <circle cx="243" cy="157" r="17" />
        <circle cx="218" cy="292" r="16" />
        <circle cx="251" cy="247" r="14" />
      </g>
      <g fill="#edb071">
        <circle cx="243" cy="157" r="9" />
        <circle cx="218" cy="292" r="8" />
        <circle cx="251" cy="247" r="7" />
      </g>
      <circle
        cx="365"
        cy="122"
        r="32"
        fill="#c9d293"
        stroke="#edf1c9"
        strokeWidth="7"
      />
      <path
        d="M365 97v49m-24-25h47m-40-17l34 34m-34 0l34-34"
        stroke="#edf1c9"
        strokeWidth="3"
      />
      <path
        d="M470 70l-16 300M485 70l-15 300"
        stroke="#795843"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <g fill="#486a3d">
        <path d="M305 199q-44-45-9-45 35 15 9 45m0 0q30-50 45-22-8 29-45 22" />
      </g>
    </svg>
  );
}
export default function App() {
  const [budget, setBudget] = useState(150);
  const [mall, setMall] = useState("all");
  const [category, setCategory] = useState<Category>("all");
  const [mild, setMild] = useState(false);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(favoriteIds);
  const [view, setView] = useState<"discover" | "saved">("discover");
  const [selected, setSelected] = useState<Dish | null>(null);
  const [message, setMessage] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<number | null>(null);
  const filtered = filterDishes(budget, mall, category, mild);
  const current = filtered.length ? filtered[index % filtered.length] : null;
  useEffect(() => {
    setIndex(0);
  }, [budget, mall, category, mild]);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  useEffect(() => {
    try {
      localStorage.setItem("ginrai-demo-saved", JSON.stringify(saved));
    } catch {
      setMessage("บันทึกได้เฉพาะครั้งนี้ เบราว์เซอร์ไม่อนุญาต LocalStorage");
    }
  }, [saved]);
  function save(id: string) {
    setSaved((v) => toggleFavorite(v, id));
    setMessage(
      saved.includes(id)
        ? "นำเมนูออกจากที่บันทึกแล้ว"
        : "บันทึกเมนูตัวอย่างในเบราว์เซอร์แล้ว",
    );
  }
  function next(dir = 1) {
    if (filtered.length)
      setIndex((v) => (v + dir + filtered.length) % filtered.length);
  }
  function keyboard(e: KeyboardEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("button,input,select,a")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next(-1);
    }
    if (e.key === "ArrowDown" && current) {
      e.preventDefault();
      save(current.id);
    }
  }
  function reset() {
    setBudget(150);
    setMall("all");
    setCategory("all");
    setMild(false);
    setIndex(0);
  }
  return (
    <>
      <a href="#meal" className="skip">
        ข้ามไปเลือกเมนู
      </a>
      <section className="demo-strip" aria-label="ข้อมูลสาธิต">
        FRONTEND SHOWCASE / ข้อมูลเมนู ร้าน สถานที่
        และราคาทั้งหมดเป็นตัวอย่างสมมติ
      </section>
      <header>
        <a className="logo" href="#meal" onClick={() => setView("discover")}>
          <span>
            <UtensilsCrossed size={22} />
          </span>
          กินไร<small>GINRAI</small>
        </a>
        <nav aria-label="เมนูหลัก">
          <button
            className={view === "discover" ? "active" : ""}
            onClick={() => setView("discover")}
          >
            หาอะไรอร่อย
          </button>
          <button
            className={view === "saved" ? "active" : ""}
            onClick={() => setView("saved")}
          >
            <Heart size={16} />
            ที่บันทึกไว้ <span>{saved.length}</span>
          </button>
        </nav>
        <span className="local-label">
          <span />
          LOCAL-ONLY DEMO
        </span>
      </header>
      <main>
        <section className="intro">
          <div>
            <span className="eyebrow">LESS SCROLLING, MORE LUNCH.</span>
            <h1>
              พักคิดเรื่องงาน.
              <br />
              มาคิดเรื่อง<span>กิน</span>กัน
            </h1>
            <p>
              เลือกงบ เลือกสิ่งที่ชอบ แล้วเจอมื้อที่ตรงใจ
              <br />
              ไม่ต้องเลือกจากเมนูยาวเป็นหน้า ๆ
            </p>
          </div>
          <div className="intro-note">
            <span className="note-doodle">☺</span>
            <p>
              มื้อธรรมดา
              <br />
              ก็เป็นมื้อที่ดีได้
            </p>
            <ArrowDown size={20} />
          </div>
        </section>
        {view === "discover" ? (
          <section id="meal" className="meal-layout">
            <aside className="filters">
              <div className="filter-title">
                <SlidersHorizontal size={18} />
                <h2>มื้อนี้เอาแบบไหนดี</h2>
              </div>
              <label className="field-label">
                ศูนย์อาหารตัวอย่าง
                <select
                  aria-label="ศูนย์อาหารตัวอย่าง"
                  value={mall}
                  onChange={(e) => setMall(e.target.value)}
                >
                  {Object.entries(malls).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="budget-heading">
                <label htmlFor="budget">งบต่อจาน</label>
                <strong>฿{budget}</strong>
              </div>
              <input
                id="budget"
                type="range"
                min="60"
                max="300"
                step="10"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>฿60</span>
                <span>฿300</span>
              </div>
              <fieldset>
                <legend>วันนี้อยากกิน</legend>
                <div className="category">
                  {(
                    [
                      ["all", "อะไรก็ได้"],
                      ["rice", "ข้าว"],
                      ["noodles", "เส้น"],
                      ["plant", "เมนูพืช"],
                    ] as [Category, string][]
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      aria-pressed={id === category}
                      onClick={() => setCategory(id)}
                    >
                      {id === "plant" && <Leaf size={13} />} {label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="mild">
                <input
                  type="checkbox"
                  checked={mild}
                  onChange={(e) => setMild(e.target.checked)}
                />
                ไม่เอาเผ็ดวันนี้
              </label>
              <button className="reset" onClick={reset}>
                <RotateCcw size={13} />
                เริ่มเลือกใหม่
              </button>
              <div className="filter-note">
                <span>SMALL DECISION, GOOD DAY.</span>
                <p>
                  นี่เป็นการกรองรายการตัวอย่างตามเงื่อนไข
                  ไม่ใช่ระบบจัดอันดับร้านอาหาร
                </p>
              </div>
            </aside>
            <div className="dish-workspace" onKeyDown={keyboard}>
              <div className="deck-top">
                <span>{filtered.length} เมนูตัวอย่างในงบคุณ</span>
                <span>
                  เลื่อนดูแบบไม่ต้องรีบ <ArrowRight size={13} />
                </span>
              </div>
              {current ? (
                <>
                  <article
                    className="dish"
                    tabIndex={0}
                    aria-label="เมนูปัจจุบัน ใช้ลูกศรซ้ายขวาเปลี่ยนเมนู ลงเพื่อบันทึก"
                    onPointerDown={(e) => {
                      touch.current = e.clientX;
                    }}
                    onPointerUp={(e) => {
                      if (
                        touch.current !== null &&
                        Math.abs(e.clientX - touch.current) > 60
                      ) {
                        next(e.clientX < touch.current ? 1 : -1);
                      }
                      touch.current = null;
                    }}
                  >
                    <div className="dish-visual">
                      <FoodArt dish={current} />
                      <span className="dish-index">
                        {((index % filtered.length) + 1)
                          .toString()
                          .padStart(2, "0")}{" "}
                        / {filtered.length.toString().padStart(2, "0")}
                      </span>
                      <span className="dish-tag">
                        {current.spicy ? (
                          <>
                            <Flame size={12} />
                            เผ็ด
                          </>
                        ) : current.category === "plant" ? (
                          <>
                            <Leaf size={12} />
                            เมนูพืช
                          </>
                        ) : (
                          "มื้อสบาย ๆ"
                        )}
                      </span>
                      <button
                        className="save"
                        aria-label={`${saved.includes(current.id) ? "เลิกบันทึก" : "บันทึก"} ${current.name}`}
                        aria-pressed={saved.includes(current.id)}
                        onClick={() => save(current.id)}
                      >
                        <Heart
                          size={20}
                          fill={
                            saved.includes(current.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </div>
                    <div className="dish-content">
                      <div className="shop-line">
                        <span>{current.shop} · ร้านสมมติ</span>
                        <span>{current.english}</span>
                      </div>
                      <div className="dish-heading">
                        <h2>{current.name}</h2>
                        <strong>
                          <small>ตัวอย่าง</small>฿{current.price}
                        </strong>
                      </div>
                      <p>{current.note}</p>
                      <div className="dish-location">
                        <MapPin size={14} />
                        {malls[current.mall]} · {current.floor}
                      </div>
                    </div>
                  </article>
                  <div className="deck-actions">
                    <button
                      aria-label="เมนูก่อนหน้า"
                      className="arrow"
                      onClick={() => next(-1)}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button className="skip-dish" onClick={() => next()}>
                      ขอดูจานอื่น <ChevronRight size={17} />
                    </button>
                    <button
                      className="primary"
                      onClick={() => setSelected(current)}
                    >
                      มื้อนี้จานนี้ <ArrowUpRight size={18} />
                    </button>
                    <button
                      aria-label="เมนูถัดไป"
                      className="arrow"
                      onClick={() => next()}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <p className="keyboard-note">
                    โฟกัสการ์ดแล้วใช้ ← → เพื่อเปลี่ยนจาน · ↓ เพื่อบันทึก ·
                    Swipe บนมือถือ
                  </p>
                </>
              ) : (
                <div className="empty">
                  <UtensilsCrossed size={35} />
                  <h2>ยังไม่มีจานที่ตรงเงื่อนไข</h2>
                  <p>ลองเพิ่มงบ หรือเลือกเมนูประเภทอื่น</p>
                  <button className="primary" onClick={reset}>
                    ดูเมนูตัวอย่างทั้งหมด
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section id="meal" className="saved-section">
            <div className="saved-heading">
              <div>
                <span className="eyebrow">YOUR LITTLE LUNCH LIST</span>
                <h2>เผื่อมื้อถัดไป.</h2>
              </div>
              <span>{saved.length} เมนูที่บันทึกไว้ในเครื่อง</span>
            </div>
            {saved.length ? (
              <div className="saved-grid">
                {dishes
                  .filter((d) => saved.includes(d.id))
                  .map((d) => (
                    <article key={d.id}>
                      <button
                        className="saved-art"
                        onClick={() => setSelected(d)}
                        aria-label={`ดู ${d.name}`}
                      >
                        <FoodArt dish={d} />
                      </button>
                      <div className="saved-info">
                        <h3>{d.name}</h3>
                        <span>฿{d.price} · ตัวอย่างสมมติ</span>
                        <button
                          aria-label={`นำ ${d.name} ออก`}
                          onClick={() => save(d.id)}
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            ) : (
              <div className="empty">
                <Heart size={32} />
                <h2>เก็บจานที่ถูกใจไว้ตรงนี้</h2>
                <p>กดหัวใจบนเมนู แล้วกลับมาดูได้ในเบราว์เซอร์นี้</p>
                <button className="primary" onClick={() => setView("discover")}>
                  กลับไปเลือกเมนู
                </button>
              </div>
            )}
          </section>
        )}
        <section className="how">
          <span className="eyebrow">A BETTER KIND OF LUNCH BREAK</span>
          <div>
            <span>01</span>
            <p>
              <strong>เริ่มที่งบของคุณ</strong>เลือกช่วงราคาที่สบายใจ
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <strong>ดูทีละจาน</strong>จานไหนถูกใจค่อยเก็บไว้
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              <strong>เลือกได้แบบเบา ๆ</strong>มื้อถัดไปค่อยว่ากันใหม่
            </p>
          </div>
        </section>
        <p className="message" role="status">
          {message}
        </p>
      </main>
      <footer>
        <strong>กินไร · GINRAI</strong>
        <span>Independent frontend showcase · All data is synthetic</span>
        <span>ไม่มีการสั่งซื้อ ไม่มีการติดตาม</span>
      </footer>
      <dialog
        ref={dialog}
        aria-labelledby="selected-heading"
        onClose={() => setSelected(null)}
        onCancel={() => setSelected(null)}
      >
        {selected && (
          <>
            <div className="dialog-top">
              <span className="eyebrow">YOUR DEMO CHOICE</span>
              <button
                autoFocus
                aria-label="ปิดเมนู"
                onClick={() => dialog.current?.close()}
              >
                <X size={20} />
              </button>
            </div>
            <FoodArt dish={selected} />
            <div className="choice">
              <span className="choice-status">
                <Check size={15} />
                เลือกเมนูตัวอย่างแล้ว
              </span>
              <h2 id="selected-heading">{selected.name}</h2>
              <p>{selected.note}</p>
              <div className="choice-price">
                <strong>฿{selected.price}</strong>
                <span>ราคาและร้านเป็นข้อมูลสมมติ</span>
              </div>
              <p className="ingredients">
                ส่วนประกอบตัวอย่าง: {selected.ingredients.join(" · ")}
              </p>
              <p className="boundary">
                นี่ไม่ใช่การสั่งอาหารหรือจองโต๊ะ
                ข้อมูลส่วนประกอบไม่ใช้รับรองสารก่อภูมิแพ้หรือข้อกำหนดอาหารจริง
              </p>
              <button className="primary" onClick={() => save(selected.id)}>
                <Heart size={17} />
                {saved.includes(selected.id)
                  ? "นำออกจากที่บันทึก"
                  : "เก็บไว้เผื่อมื้อหน้า"}
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

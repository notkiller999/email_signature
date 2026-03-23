import { RefObject } from "react";

interface SignaturePreviewProps {
	signatureRef: RefObject<HTMLDivElement | null>;
	data: {
		name: string;
		jobtitle: string;
		email: string;
		photoUrl: string;
		tel: string;
		website: string;
	};
}

export default function SignaturePreview({
	signatureRef,
	data,
}: SignaturePreviewProps) {
	return (
		<div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 overflow-auto dark:bg-slate-950 dark:border-slate-400">
			<h2 className="text-sm text-gray-400 mb-4 uppercase dark:text-slate-400">
				Preview
			</h2>
			<div ref={signatureRef}>
				<table
					cellPadding={0}
					cellSpacing={0}
					border={0}
					width="600"
					{...{
						background:
							"https://res.cloudinary.com/dfs8grejr/image/upload/v1774129808/backgroun_eliftech_acljhz.png",
					}}
					style={{
						width: "600px",
						height: "150px",
						fontFamily: "Arial, sans-serif",
						backgroundSize: "100% 100%",
						backgroundImage:
							"url('https://res.cloudinary.com/dfs8grejr/image/upload/v1774129808/backgroun_eliftech_acljhz.png')",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
						backgroundColor: "#1f00d1",
					}}
				>
					<tbody>
						<tr style={{ padding: "26px 0" }}>
							<td
								width="153"
								align="center"
								valign="middle"
								style={{ width: "153px", height: "150px" }}
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={data.photoUrl}
									width="100"
									height="100"
									alt={data.name}
									style={{
										borderRadius: "50%",
										display: "block",
										margin: "0 auto",
										objectFit: "cover",
									}}
								/>
							</td>

							<td align="left" valign="middle">
								<div style={{ display: "inline-block" }}>
									<div
										style={{
											fontSize: "26px",
											fontWeight: "bold",
											color: "#ffffff",
											lineHeight: "26px",
											marginBottom: "4px",
										}}
									>
										{data.name ? data.name : "Your Name"}
									</div>
									<div
										style={{
											fontSize: "16px",
											color: "#ffffff",
											lineHeight: "16px",
											marginBottom: "8px",
											letterSpacing: "1px",
										}}
									>
										{data.jobtitle ? data.jobtitle : "Your Position"}
									</div>
								</div>
								<table cellPadding={0} cellSpacing={0} border={0}>
									<tbody>
										<tr>
											<td
												valign="middle"
												style={{
													width: "20px",
													lineHeight: "14px",
												}}
											>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src="https://res.cloudinary.com/dfs8grejr/image/upload/v1774110902/svxdk0581n0xg9wgvmyw.png"
													width="10"
													height="10"
													style={{ display: "block" }}
													alt="Email"
												/>
											</td>
											<td
												valign="middle"
												style={{
													lineHeight: "14px",
												}}
											>
												<a
													href={`mailto:${data.email}`}
													style={{
														fontSize: "10px",
														color: "#ffffff",
														textDecoration: "none",
														letterSpacing: "0.4px",
														border: "none",
														outline: "none",
														display: "inline-block",
													}}
												>
													<span
														style={{ color: "#ffffff", textDecoration: "none" }}
													>
														{data.email ? data.email : "example@email.com"}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td
												valign="middle"
												style={{
													width: "20px",
													lineHeight: "14px",
												}}
											>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src="https://res.cloudinary.com/dfs8grejr/image/upload/v1774110951/lojo20qbtmf6c87lwrrx.png"
													width="10"
													height="10"
													style={{ display: "block" }}
													alt="tel"
												/>
											</td>
											<td
												valign="middle"
												style={{
													lineHeight: "14px",
												}}
											>
												<a
													href={`tel:${data.tel}`}
													style={{
														fontSize: "10px",
														color: "#ffffff",
														textDecoration: "none",
														letterSpacing: "0.4px",
														border: "none",
														outline: "none",
														display: "inline-block",
													}}
												>
													<span
														style={{ color: "#ffffff", textDecoration: "none" }}
													>
														{data.tel ? data.tel : "+380123456789"}
													</span>
												</a>
											</td>
										</tr>
										<tr>
											<td
												valign="middle"
												style={{ width: "20px", lineHeight: "14px" }}
											>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src="https://res.cloudinary.com/dfs8grejr/image/upload/v1774110975/ioecuw7lhl7ezqzg2qaw.png"
													width="10"
													height="10"
													style={{ display: "block" }}
													alt="Web"
												/>
											</td>
											<td valign="middle" style={{ lineHeight: "14px" }}>
												<a
													href={
														data.website.startsWith("http")
															? data.website
															: `https://${data.website}`
													}
													style={{
														fontSize: "10px",
														color: "#ffffff",
                            textDecorationColor: "#ff00d9",
														textDecoration: "none !important",
                            borderBottom: "1px solid transparent !important",
														letterSpacing: "0.4px",
														border: "none",
														outline: "none",
														display: "inline-block",
													}}
												>
													<span
														style={{ color: "#ffffff", textDecoration: "none" }}
													>
														{data.website}
													</span>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
